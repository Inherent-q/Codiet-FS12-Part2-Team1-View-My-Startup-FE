import { usePaginationFetch } from "../hooks/usePaginationFetch";
import CompanyRow from "./components/CompanyRow";
import "./style/Home.css";
import searchIcon from "./assets/ic_search.svg";
import toggleIcon from "./assets/ic_toggle.svg";
import arrowLeft from "./assets/ic_arrow_left.svg";
import arrowRight from "./assets/ic_arrow_right.svg";

const SORT_OPTIONS = [
  { label: "매출액 높은순",      sortBy: "revenue",    sortOrder: "desc" },
  { label: "매출액 낮은순",      sortBy: "revenue",    sortOrder: "asc"  },
  { label: "누적 투자 높은순",   sortBy: "accInvest",  sortOrder: "desc" },
  { label: "누적 투자 낮은순",   sortBy: "accInvest",  sortOrder: "asc"  },
  { label: "고용 인원 많은순",   sortBy: "hire",       sortOrder: "desc" },
  { label: "고용 인원 적은순",   sortBy: "hire",       sortOrder: "asc"  },
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

  // 현재 선택된 정렬 옵션 값 (select value로 사용)
  const currentSort = `${sortBy}_${sortOrder}`;

  const handleSortChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split("_");
    handleSortBy(newSortBy);
    handleSortOrder(newSortOrder);
  };

  // 5개씩 페이지 그룹 계산
  const totalPages = pagination?.totalPages || 1;
  const pageGroupStart = Math.floor((page - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const pageGroupEnd = Math.min(pageGroupStart + PAGE_GROUP_SIZE - 1, totalPages);
  const pageNumbers = Array.from(
    { length: pageGroupEnd - pageGroupStart + 1 },
    (_, i) => pageGroupStart + i
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
            {/* 정렬 */}
            <div className="sort-wrapper">
              <select
                className="sort-select"
                value={currentSort}
                onChange={handleSortChange}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={`${opt.sortBy}_${opt.sortOrder}`} value={`${opt.sortBy}_${opt.sortOrder}`}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <img src={toggleIcon} alt="" className="sort-icon" />
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
          <div className="pagination-wrapper">
          <div className="pagination">
            <button
              className="page-arrow"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <img src={arrowLeft} alt="이전" />
            </button>

            {pageNumbers.map((p) => (
              <button
                key={p}
                className={`page-btn ${p === page ? "active" : ""}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}

            <button
              className="page-arrow"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <img src={arrowRight} alt="다음" />
            </button>
          </div>
          </div>
        )}

      </main>
    </div>
  );
}
