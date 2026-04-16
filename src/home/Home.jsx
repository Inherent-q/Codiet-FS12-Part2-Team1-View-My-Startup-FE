import { useState, useRef, useEffect } from "react";
import { usePaginationFetch } from "../hooks/usePaginationFetch";
import CompanyRow from "./components/CompanyRow";
import Pagination from "../components/Pagination";
import "./style/Home.css";
import searchIcon from "./assets/ic_search.svg";
import toggleIcon from "./assets/ic_toggle.svg";

const SORT_OPTIONS = [
  { label: "매출액 높은순", sortBy: "revenue", sortOrder: "desc" },
  { label: "매출액 낮은순", sortBy: "revenue", sortOrder: "asc" },
  { label: "누적 투자 높은순", sortBy: "accInvest", sortOrder: "desc" },
  { label: "누적 투자 낮은순", sortBy: "accInvest", sortOrder: "asc" },
  { label: "고용 인원 많은순", sortBy: "hire", sortOrder: "desc" },
  { label: "고용 인원 적은순", sortBy: "hire", sortOrder: "asc" },
];

const PAGE_GROUP_SIZE = 5;

export default function Home() {
  const {
    data,
    pagination,
    isLoading,
    error,
    page,
    search,
    sortBy,
    sortOrder,
    setPage,
    handleSearch,
    handleSortBy,
    handleSortOrder,
  } = usePaginationFetch("http://localhost:3000/api/corporations");

  // 드롭다운 열림/닫힘
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 현재 선택된 옵션 라벨
  const currentOption =
    SORT_OPTIONS.find(
      (opt) => opt.sortBy === sortBy && opt.sortOrder === sortOrder,
    ) || SORT_OPTIONS[0];

  const handleSortSelect = (opt) => {
    handleSortBy(opt.sortBy);
    handleSortOrder(opt.sortOrder);
    setIsDropdownOpen(false);
  };

  // 페이지 그룹
  const totalPages = pagination?.totalPages || 1;
  const pageGroupStart =
    Math.floor((page - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const pageGroupEnd = Math.min(
    pageGroupStart + PAGE_GROUP_SIZE - 1,
    totalPages,
  );
  const pageNumbers = Array.from(
    { length: pageGroupEnd - pageGroupStart + 1 },
    (_, i) => pageGroupStart + i,
  );

  return (
    <div className="home-page">
      <main className="home-content">
        {/* 헤더 */}
        <div className="list-header">
          <h1 className="list-title">전체 스타트업 목록</h1>
          <div className="list-controls">
            {/* 검색 */}
            <div className="search-wrapper">
              <img src={searchIcon} alt="검색" className="search-icon" />
              <input
                className="search-input"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="검색어를 입력해주세요"
              />
            </div>

            {/* 커스텀 드롭다운 */}
            <div className="sort-wrapper" ref={dropdownRef}>
              <button type="button"
                className="sort-trigger"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <span>{currentOption.label}</span>
                <img src={toggleIcon} alt="" className={"sort-icon"} />
              </button>

              {isDropdownOpen && (
                <div className="sort-dropdown">
                  {SORT_OPTIONS.map((opt, index) => {
                    const isFirst = index === 0;
                    const isLast = index === SORT_OPTIONS.length - 1;
                    const isSelected =
                      opt.sortBy === sortBy && opt.sortOrder === sortOrder;

                    return (
                      <button type="button"
                        key={`${opt.sortBy}_${opt.sortOrder}`}
                        className={[
                          "sort-option",
                          isFirst ? "first" : "",
                          isLast ? "last" : "",
                          isSelected ? "selected" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => handleSortSelect(opt)}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 테이블 */}
        <div className="table-wrapper">
          {isLoading ? (
            <div className="loading">불러오는 중...</div>
          ) : error ? (
            <div className="error">에러: {error}</div>
          ) : (
            <table className="company-table">
              <thead>
                <tr>
                  <th className="th-rank">순위</th>
                  <th className="th-name">기업 명</th>
                  <th className="th-desc">기업 소개</th>
                  <th className="th-category">카테고리</th>
                  <th className="th-number">누적 투자 금액</th>
                  <th className="th-number">매출액</th>
                  <th className="th-number">고용 인원</th>
                </tr>
              </thead>
              <tbody>
                {data.map((company, index) => (
                  <CompanyRow
                    key={company.id}
                    company={company}
                    rank={(page - 1) * 10 + index + 1}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* 페이지네이션 */}
        {pagination && (
          <Pagination
            page={page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        )}
      </main>
    </div>
  );
}
