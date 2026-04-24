import { useRef, useState, useEffect, useCallback } from "react";
import { usePaginationFetch } from "../hooks/usePaginationFetch";
import CompanyRow from "./components/CompanyRow";
import SortDropdown from "./components/SortDropdown";
import Pagination from "../components/Pagination";
import HomeSkeletonTable from "./components/HomeSkeletonTable";
import "./style/home.css";
import searchIcon from "../assets/search.svg";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const TableHead = () => (
  <thead>
    <tr>
      <th className="home-th-rank">순위</th>
      <th className="home-th-name">기업 명</th>
      <th className="home-th-desc">기업 소개</th>
      <th className="home-th-category">카테고리</th>
      <th className="home-th-number">누적 투자 금액</th>
      <th className="home-th-number">매출액</th>
      <th className="home-th-number">고용 인원</th>
    </tr>
  </thead>
);

export default function Home() {
  const {
    displayData,
    pagination,
    isLoading,
    limit,
    error,
    page,
    search,
    sortBy,
    sortOrder,
    setPage,
    handleSearch,
    handleSort,
  } = usePaginationFetch(`${API_BASE_URL}/corporations`, {
    initialSortBy: "revenue",
    initialSortOrder: "desc",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // 드롭다운 바깥 클릭 처리

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortSelect = useCallback(
    (opt) => {
      handleSort(opt.sortBy, opt.sortOrder);
      setIsDropdownOpen(false);
    },
    [handleSort],
  );

  const handleToggleDropdown = useCallback(
    () => setIsDropdownOpen((prev) => !prev),
    [],
  );

  return (
    <div className="home-page">
      <main className="home-content">
        <div className="home-list-header">
          <h1 className="home-list-title">전체 스타트업 목록</h1>
          <div className="list-controls">
            <div className="search-wrapper">
              <img src={searchIcon} alt="검색" className="search-icon" />
              <input
                className="search-input"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="검색어를 입력해주세요"
              />
            </div>
            <SortDropdown
              ref={dropdownRef}
              isOpen={isDropdownOpen}
              onToggle={handleToggleDropdown}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSelect={handleSortSelect}
            />
          </div>
        </div>

        <div className="home-table-wrapper">
          {error ? (
            <div className="error-message">데이터를 불러오지 못했습니다.</div>
          ) : isLoading && displayData.length === 0 ? (
            <table className="home-company-table">
              <TableHead />
              <tbody>
                <HomeSkeletonTable />
              </tbody>
            </table>
          ) : displayData.length === 0 ? (
            <div className="error-message">
              {search ? "검색 결과가 없습니다." : "기업 데이터가 없습니다."}
            </div>
          ) : (
            <table
              className={`home-company-table${isLoading ? " is-loading" : ""}`}
            >
              <TableHead />
              <tbody>
                {displayData.map((company, index) => (
                  <CompanyRow
                    key={company.id}
                    company={company}
                    rank={(page - 1) * limit + index + 1}
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
