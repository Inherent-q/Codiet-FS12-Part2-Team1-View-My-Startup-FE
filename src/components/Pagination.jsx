import "./Pagination.css";
import arrowLeft from "../assets/arrow_left.svg";
import arrowRight from "../assets/arrow_right.svg";

const PAGE_GROUP_SIZE = 5;

export default function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;
  
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
    <div className="pagination-wrapper">
      <div className="pagination">
        <button
          className="page-arrow"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <img src={arrowLeft} alt="이전" />
        </button>

        <div className="page-numbers">
          {pageNumbers.map((p) => (
            <button
              key={p}
              className={`page-btn ${p === page ? "active" : ""}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          className="page-arrow"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <img src={arrowRight} alt="다음" />
        </button>
      </div>
    </div>
  );
}
