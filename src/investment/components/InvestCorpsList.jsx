import React from "react";
import { useNavigate } from "react-router-dom";

const InvestCorpsList = ({ corps, curPage }) => {
  // 돈 단위 변환
  const formatMoney = function (value) {
    const num = Number(value);
    if (num >= 100000000) {
      return `${Math.floor(num / 100000000)}억`;
    } else if (10000 <= num && num < 100000000) {
      return `${Math.floor(num / 10000)}만`;
    } else if (0 <= num && num < 10000) {
      return num.toLocaleString();
    } else {
      return "에러 발생";
    }
  };

  // 기업 상세페이지로 이동
  const navigate = useNavigate();
  const handleNavigate = function (c) {
    navigate(`/detail/${c.id}`);
  };

  return (
    <tbody className="tbody">
      <tr className="gap"></tr>
      {corps.map(function (c, index) {
        return (
          <tr
            className="tbody-tr"
            key={c.id}
            onClick={function () {
              handleNavigate(c);
            }}
          >
            <td className="rank">{(curPage - 1) * 10 + index + 1}위</td>
            <td>
              <div className="corp-name">
                <img className="corp-img" src={c.img} />
                {c.name}
              </div>
            </td>
            <td className="corp-descrip">{c.description}</td>
            <td className="category">{c.category}</td>
            <td className="vms-acc">{formatMoney(c.vms)}원</td>
            <td className="accinvest">{formatMoney(c.accInvest)}원</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default InvestCorpsList;
