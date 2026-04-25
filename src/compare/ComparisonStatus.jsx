import { useRef, useState, useEffect, useCallback } from "react";
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
    limit,
    error,
    page,
    sortBy,
    sortOrder,
    setPage,
    handleSort,
  } = usePaginationFetch(`${API_BASE_URL}/comparison-status`, {
    initialSortBy: "myCount",
    initialSortOrder: "desc",
  });

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

  const handleSortSelect = useCallback(
    (opt) => {
      handleSort(opt.sortBy, opt.sortOrder);
      setIsDropdownOpen(false);
    },
    [handleSort],
  );

  const tableClassName = [
    "company-table",
    isLoading && displayData.length > 0 && "is-loading",
  ]
    .filter(Boolean)
    .join(" ");

  const handleToggleDropdown = useCallback(
    () => setIsDropdownOpen((prev) => !prev),
    [],
  );

  return (
    <main className="comparison-page">
      <div className="comparison-content">
        <div className="list-header">
          <h1 className="list-title">비교 현황</h1>
          <SortDropdown
            ref={dropdownRef}
            isOpen={isDropdownOpen}
            onToggle={handleToggleDropdown}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSelect={handleSortSelect}
          />
        </div>

        <div className="table-wrapper">
          {error ? (
            <div className="error-message">데이터를 불러오지 못했습니다.</div>
          ) : (
            <table className={tableClassName}>
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
                  <CompareSkeletonBody />
                ) : (
                  <>
                    {!isLoading && displayData.length === 0 && (
                      <tr>
                        <td colSpan={6}>비교 현황이 없습니다.</td>
                      </tr>
                    )}
                    {displayData.map((company, index) => (
                      <CompanyCard
                        key={company.id}
                        company={company}
                        rank={(page - 1) * limit + index + 1}
                      />
                    ))}
                  </>
                )}
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
      </div>
    </main>
  );
}
