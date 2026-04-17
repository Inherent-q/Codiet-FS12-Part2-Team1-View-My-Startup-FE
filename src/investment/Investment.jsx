import React, { useEffect, useState } from "react";
import "./Investment.css";
import "../components/Pagination.css";
import toggleImage from "../assets//toggle.svg";
import Pagination from "../components/Pagination";

const Investment = () => {
  const [corps, setCoprs] = useState([]);
  const [none, setNone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [sort, setSort] = useState("vms");
  const [order, setOrder] = useState("desc");
  const [toggle, setToggle] = useState(false);

  useEffect(
    function () {
      const fetchData = async function () {
        const res = await fetch(
          `http://localhost:3000/api/corporations/list?sort=${sort}&order=${order}&page=${curPage}`,
        );
        const data = await res.json();

        setCoprs(data.data);
        setTotalPage(data.totalPages);
      };
      fetchData();
    },
    [sort, order, curPage],
  );

  // 투자 현황 없을 때

  const noData = function () {
    //만약 받은 데이터가 없으면 "아직 투자 현황이 없습니다" 보여주고
    //받은 데이터가 있으면 h1 아래부터 보여주면 된다.
  };

  // 데이터 로딩 중일 때

  //정렬

  const handleToggle = function () {
    setToggle(!toggle);
  };

  const dropdown = function () {
    if (toggle === true) {
      return (
        <div className="sort-options">
          <button className="vms-desc" onClick={handleVMSDesc}>
            View My Startup 투자 금액 높은순
          </button>
          <button className="vms-asc" onClick={handleVMSAsc}>
            View My Startup 투자 금액 낮은순
          </button>
          <button className="amount-desc" onClick={handleAccDesc}>
            실제 누적 투자 금액 높은순
          </button>
          <button className="amount-asc" onClick={handleAccAsc}>
            실제 누적 투자 금액 낮은순
          </button>
        </div>
      );
    } else {
      return;
    }
  };

  const handleVMSDesc = function () {
    setSort("vms");
    setOrder("desc");
    setToggle(!toggle);
  };
  const handleVMSAsc = function () {
    setSort("vms");
    setOrder("asc");
    setToggle(!toggle);
  };
  const handleAccDesc = function () {
    setSort("accInvest");
    setOrder("desc");
    setToggle(!toggle);
  };
  const handleAccAsc = function () {
    setSort("accInvest");
    setOrder("asc");
    setToggle(!toggle);
  };

  const sortText = function () {
    if (sort === "vms" && order === "desc") {
      return "View My Startup 투자 금액 높은순";
    } else if (sort === "vms" && order === "asc") {
      return "View My Startup 투자 금액 낮은순";
    } else if (sort === "accInvest" && order === "desc") {
      return "실제 누적 투자 금액 높은순";
    } else if (sort === "accInvest" && order === "asc") {
      return "실제 누적 투자 금액 낮은순";
    } else {
      return "View My Startup 투자 금액 높은순";
    }
  };

  //페이지네이션 - 컴포넌트 연결

  const handlePageChange = function (p) {
    setCurPage(p);
  };

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

  return (
    <div className="all-wrapper">
      <div className="title-sort-wrapper">
        <h1>투자 현황</h1>
        {/* <div className="none-text">아직 투자 현황이 없습니다.</div> */}
        <div className="dropdown-wrapper">
          <div className="dropdown-board">
            <button className="sort-btn" onClick={handleToggle}>
              {sortText()}
            </button>
            <button className="dropdown-toggle" onClick={handleToggle}>
              <img src={toggleImage} />
            </button>
          </div>
          <div className="sort-options-wrapper">{dropdown()}</div>
        </div>
      </div>
      {/* <div className="loading-text">데이터를 가져오는 중입니다.</div> */}
      <div className="table-wrapper">
        <table className="table">
          <thead className="thead">
            <tr>
              <th>순위</th>
              <th>기업명</th>
              <th>기업 소개</th>
              <th>카테고리</th>
              <th>View My Startup 투자 금액</th>
              <th>실제 누적 투자 금액</th>
            </tr>
          </thead>

          <tbody className="tbody">
            <tr className="gap"></tr>
            {corps.map(function (c, index) {
              return (
                <tr className="tbody-tr" key={c.id}>
                  <td>{(curPage - 1) * 10 + index + 1}위</td>
                  <td className="corp-name">
                    <img className="corp-img" src={c.img} />
                    {c.name}
                  </td>
                  <td className="corp-desrip">{c.description}</td>
                  <td>{c.category}</td>
                  <td>{formatMoney(c.vms)}원</td>
                  <td>{formatMoney(c.accInvest)}원</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        page={curPage}
        totalPages={totalPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Investment;
