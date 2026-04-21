import { useRef, useState, useEffect } from "react";
import { usePaginationFetch } from "../hooks/usePaginationFetch";
import CompanyRow from "./components/CompanyRow";
import SortDropdown from "./components/SortDropdown";
import Pagination from "../components/Pagination";
import SkeletonTable from "./components/SkeletonTable";
import "./style/home.css";
import searchIcon from "./assets/ic_search.svg";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function Home() {
  const {
    displayData,
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
  } = usePaginationFetch(`${API_BASE_URL}/corporations`);

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

  const handleSortSelect = (opt) => {
    handleSortBy(opt.sortBy);
    handleSortOrder(opt.sortOrder);
    setIsDropdownOpen(false);
  };

  return (
    <div className="home-page">
      <main className="home-content">
        <div className="list-header">
          <h1 className="list-title">전체 스타트업 목록</h1>
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
              onToggle={() => setIsDropdownOpen((prev) => !prev)}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSelect={handleSortSelect}
            />
          </div>
        </div>

        <div className="table-wrapper">
          {isLoading && displayData.length === 0 ? (
            <SkeletonTable /> // 최초 진입 or 정렬/검색 변경 시
          ) : (
            // 페이지 이동중
            <table className={`company-table${isLoading ? " is-loading" : ""}`}>
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
                {/* 리스트 렌더링 */}
                {displayData.map((company, index) => (
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
