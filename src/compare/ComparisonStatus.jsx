import { useRef, useState, useEffect } from "react";
import { usePaginationFetch } from "../hooks/usePaginationFetch";
import CompanyCard from "./components/CompanyCard";
import SortDropdown from "./components/SortDropdown";
import Pagination from "../components/Pagination";
import CompareSkeletonBody from "./components/CompareSkeletonTable";
import "./style/comparisonStatus.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function ComparisonStatus() {
  const {
    displayData,
    pagination,
    isLoading,
    error,
    page,
    sortBy,
    sortOrder,
    setPage,
    handleSortBy,
    handleSortOrder,
  } = usePaginationFetch(`${API_BASE_URL}/comparison-status`);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    <div className="comparison-page">
      <main className="comparison-content">
        <div className="list-header">
          <h1 className="list-title">비교 현황</h1>
          <SortDropdown
            ref={dropdownRef}
            isOpen={isDropdownOpen}
            onToggle={() => setIsDropdownOpen((prev) => !prev)}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSelect={handleSortSelect}
          />
        </div>

        <div className="table-wrapper">
          {/* thead는 로딩 여부와 무관하게 항상 유지 */}
          <table
            className={`company-table${isLoading && displayData.length > 0 ? " is-loading" : ""}`}
          >
            <thead>
              <tr>
                <th className="th-rank">순위</th>
                <th className="th-name">기업 명</th>
                <th className="th-desc">기업 소개</th>
                <th className="th-category">카테고리</th>
                <th className="th-count">나의 기업 선택 횟수</th>
                <th className="th-count">비교 기업 선택 횟수</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && displayData.length === 0 ? (
                // 최초 진입 or 정렬 변경 시 -> 스켈레톤
                <CompareSkeletonBody />
              ) : (
                // 페이지 이동 중 -> 기존 데이터 유지 (is-loading으로 밝기만 낮춤)
                displayData.map((company, index) => (
                  <CompanyCard
                    key={company.id}
                    company={company}
                    rank={(page - 1) * 10 + index + 1}
                  />
                ))
              )}
            </tbody>
          </table>
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
