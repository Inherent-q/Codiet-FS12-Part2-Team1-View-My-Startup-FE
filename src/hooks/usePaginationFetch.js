import { useState, useEffect, useCallback, useRef } from "react";

const DEBOUNCE_DELAY = 300;

export function usePaginationFetch(
  apiEndpoint,
  { initialSortBy = "createdAt", initialSortOrder = "desc" } = {},
) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const [displayData, setDisplayData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  // apiEndpoint 변경 시 초기 sort 값으로 리셋하기 위해 ref에 보관
  const initialSortByRef = useRef(initialSortBy);
  const initialSortOrderRef = useRef(initialSortOrder);

  const handleLimit = useCallback((value) => {
    setLimit(value);
    setPage(1);
  }, []);

  // search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(timer);
  }, [search]);

  // apiEndpoint 바뀌면 전체 초기화
  useEffect(() => {
    setPage(1);
    setLimit(10);
    setSearch("");
    setDebouncedSearch(""); // debounce delay 없이 즉시 초기화
    setSortBy(initialSortByRef.current);
    setSortOrder(initialSortOrderRef.current);
    setDisplayData([]);
    setPagination(null);
  }, [apiEndpoint]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page,
          limit,
          sortBy,
          sortOrder,
          ...(debouncedSearch && { search: debouncedSearch }), // 검색어 있을 때만 파라미터에 포함
        });

        const res = await fetch(`${apiEndpoint}?${params}`, {
          signal: abortController.signal, // 위 요청 취소할 수 있게 연결
        });

        if (!res.ok) {
          const message =
            res.status >= 500
              ? `서버 오류: ${res.status}`
              : `요청 오류: ${res.status}`;
          throw new Error(message);
        }

        const json = await res.json();

        if (!json.success) throw new Error("데이터를 불러오지 못했습니다.");

        setDisplayData(json.data);
        setPagination(json.pagination);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
      } finally {
        // 취소된 요청 무시
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => abortController.abort(); // 이전 요청 취소
  }, [apiEndpoint, page, limit, debouncedSearch, sortBy, sortOrder]);

  // 페이지 이동시 스크롤 최상단
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);
  const handleSort = useCallback((by, order) => {
    setSortBy(by);
    setSortOrder(order);
    setPage(1);
  }, []);

  return {
    displayData,
    pagination,
    isLoading,
    error,
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    setPage,
    handleLimit,
    handleSearch,
    handleSort,
  };
}
