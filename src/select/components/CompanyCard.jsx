export const CompanyCard = ({
  company,
  isSelected,
  onSelect,
  showRemove,
  onRemove,
}) => {
  return (
    <div className="company-card">
      <img src={company.logo} alt={company.name} />
      <h3>{company.name}</h3>
      <p>{company.category}</p>

      {showRemove ? (
        <button onClick={() => onRemove(company.id)} className="remove-btn">
          삭제
        </button>
      ) : (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(company.id)}
        />
      )}
    </div>
  );
};
