import "../style/companyCard.css";

export default function CompanyCard({ company, rank }) {
  return (
    <tr className="company-row">
      <td className="rank-cell">{rank}위</td>
      <td className="name-cell">
        <div className="name-inner">
          <div className="company-logo">
            {company.img ? (
              <img src={company.img} alt={company.name} />
            ) : (
              <span>{company.name?.[0] ?? "?"}</span>
            )}
          </div>
          <span className="company-name">{company.name}</span>
        </div>
      </td>
      <td className="desc-cell">{company.description}</td>
      <td className="category-cell">{company.category}</td>
      <td className="count-cell">{company.myCount?.toLocaleString()}</td>
      <td className="count-cell">{company.compareCount?.toLocaleString()}</td>
    </tr>
  );
}
