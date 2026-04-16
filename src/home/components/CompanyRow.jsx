import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/CompanyRow.css";

// 숫자 억 원 단위로 변환
function formatAmount(value) {
  const num = Number(value);
  if (num >= 100000000) {
    return `${Math.floor(num / 100000000).toLocaleString()}억 원`;
  }
  return `${num.toLocaleString()}원`;
}

export default function CompanyRow({ company, rank }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/detail/${company.id}`); // 기업 상세페이지로 이동
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
              <span>{company.name[0]}</span>
            )}
          </div>

          <span className="company-name">{company.name}</span>
        </div>
      </td>

      <td className="desc-cell">{company.description}</td>
      <td className="category-cell">{company.category}</td>
      <td className="number-cell">{formatAmount(company.accInvest)}</td>
      <td className="number-cell">{formatAmount(company.revenue)}</td>
      <td className="number-cell">{company.hire}명</td>
    </tr>
  );
}
