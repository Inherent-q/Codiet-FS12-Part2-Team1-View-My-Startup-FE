import { CompanyCard } from "./CompanyCard";

export const ComparisonListSection = ({
  companies,
  onAddClick,
  onRemove,
  isDisabled,
}) => {
  return (
    <section className="comparison-section">
      <div className="section-header">
        <h2>어떤 기업이 궁금하세요?</h2>
        <p>({companies.length} / 5)</p>
      </div>

      {companies.length > 0 ? (
        <div className="company-grid">
          {companies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              showRemove={true}
              onRemove={onRemove}
            />
          ))}
        </div>
      ) : (
        <p className="empty-message">비교할 기업을 추가해주세요</p>
      )}

      <button
        onClick={onAddClick}
        className="add-company-btn"
        disabled={isDisabled}
      >
        기업 추가하기
      </button>
    </section>
  );
};
