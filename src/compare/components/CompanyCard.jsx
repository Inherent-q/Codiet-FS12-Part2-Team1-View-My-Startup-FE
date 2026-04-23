import { useNavigate } from "react-router-dom";
import "../style/companyCard.css";

export default function CompanyCard({ company, rank }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/detail/${company.id}`);
  };
  return (
    <tr
      className="company-row"
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleNavigate()}
    >
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
      <td className="count-cell">{company.myCount?.toLocaleString() ?? "-"}</td>
      <td className="count-cell">
        {company.compareCount?.toLocaleString() ?? "-"}
      </td>
    </tr>
  );
}
