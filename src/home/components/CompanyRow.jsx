import { useNavigate } from "react-router-dom";
import { formatAmount } from "../utils/format";
import "../style/companyRow.css";

export default function CompanyRow({ company, rank }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/detail/${company.id}`);
  };

  return (
    <tr
      className="home-company-row"
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleNavigate()}
    >
      <td className="home-rank-cell">{rank}위</td>
      <td className="home-name-cell">
        <div className="home-name-inner">
          <div className="home-company-logo">
            {company.img ? (
              <img src={company.img} alt={company.name} />
            ) : (
              <span>{company.name?.[0] ?? "?"}</span>
            )}
          </div>
          <span className="home-company-name">{company.name}</span>
        </div>
      </td>
      <td className="home-desc-cell">{company.description}</td>
      <td className="home-category-cell">{company.category}</td>
      <td className="home-number-cell">{formatAmount(company.accInvest)}</td>
      <td className="home-number-cell">{formatAmount(company.revenue)}</td>
      <td className="home-number-cell">{company.hire}명</td>
    </tr>
  );
}
