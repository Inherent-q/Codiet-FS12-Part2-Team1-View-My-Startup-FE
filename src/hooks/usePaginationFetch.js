import { useState, useEffect, useCallback } from "react";

const DEBOUNCE_DELAY = 300;

export function usePaginationFetch(apiEndpoint) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [debouncedSearch, setDebouncedSearch] = useState("");

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
    setSearch("");
    setDebouncedSearch("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setDisplayData([]);
  }, [apiEndpoint]);

  // 정렬/검색 바뀌면 displayData 초기화
  useEffect(() => {
    setDisplayData([]);
  }, [sortBy, sortOrder, debouncedSearch]);

  // 새 데이터 도착하면 displayData 교체
  useEffect(() => {
    if (!isLoading && data.length > 0) {
      setDisplayData(data);
    }
  }, [isLoading, data]);

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

        if (!res.ok) throw new Error(`서버 오류: ${res.status}`);

        const json = await res.json();

        if (!json.success) throw new Error("데이터를 불러오지 못했습니다.");

        setData(json.data);
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

  const handleSearch = useCallback((value) => setSearch(value), []);
  const handleSortBy = useCallback((value) => {
    setSortBy(value);
    setPage(1);
  }, []);
  const handleSortOrder = useCallback((value) => {
    setSortOrder(value);
    setPage(1);
  }, []);

  return {
    data,
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
    setLimit,
    handleSearch,
    handleSortBy,
    handleSortOrder,
  };
}
