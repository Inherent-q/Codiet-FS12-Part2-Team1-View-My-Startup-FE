import React, { useEffect, useState } from "react";
import "./Investment.css";
import toggleImage from "../assets//toggle.svg";
import leftArrow from "../assets/arrow_left.svg";
import rightArrow from "../assets/arrow_right.svg";

const Investment = () => {
  const [corps, setCoprs] = useState([]);
  const [investor, setInvestor] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [sort, setSort] = useState("vmsDesc");
  const [toggle, setToggle] = useState(false);

  useEffect(
    function () {
      const fetchData = async function () {
        const res = await fetch(
          `http://localhost:3000/api/corporations/list?page=${curPage}`,
        );
        const data = await res.json();

        setCoprs(data.data.corps);
        setTotalPage(data.data.totalPages);
      };
      fetchData();
    },
    [curPage],
  );

  useEffect(function () {
    const fetchData = async function () {
      const res = await fetch(
        "http://localhost:3000/api/corporations/investors",
      );
      const data = await res.json();
      setInvestor(data.data);
    };
    fetchData();
  }, []);

  //정렬

  const handleToggle = function () {
    setToggle((toggle = !toggle));
  };

  const dorpdown = function () {
    if (toggle === true) {
      return (
        <div>
          <button>View My Startup 투자 금액 높은순</button>
          <button>View My Startup 투자 금액 낮은순</button>
          <button>실제 누적 투자 금액 높은순</button>
          <button>실제 누적 투자 금액 낮은순</button>
        </div>
      );
    } else {
      return;
    }
  };

  //1. 토글 버튼 클릭시 드롭다운 열리고 닫히기
  //2. 드롭다운 열렸을 때 4가지 정렬 옵션 보여주기

  //3. 옵션 클릭하면 sort 변경되고, 드롭다운 닫힌다
  //4. 변경된 sort에 따라서 테이블 정렬이 바뀐다.

  const handleSorting = function () {
    setSort(...corps);
  };

  //페이지네이션

  const prevPage = function () {
    if (curPage === 1) {
      return;
    } else {
      return setCurPage(curPage - 1);
    }
  };

  const nextPage = function () {
    if (curPage === totalPage) {
      return;
    } else {
      return setCurPage(curPage + 1);
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  return (
    <div className="all-wrapper">
      <div className="title-sort-wrapper">
        <h1>투자 현황</h1>
        <div className="dropdown">
          <div className="dropdown-wrapper">
            <span className="sort-text">View My Startup 투자 금액 높은순</span>
            <button className="dropdown-toggle">
              <img src={toggleImage} />
            </button>
          </div>
        </div>
      </div>
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
                  <td>
                    {investor
                      .filter(function (i) {
                        return i.corpId === c.id;
                      })
                      .reduce(function (acc, cur) {
                        return acc + Number(cur.amount);
                      }, 0)
                      .toLocaleString()}
                    원
                  </td>
                  <td>{Number(c.accInvest).toLocaleString()}원</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button className="arrow" onClick={prevPage} disabled={curPage === 1}>
          <img src={leftArrow} />
        </button>
        <div className="page-number">
          {pages.map(function (p) {
            return (
              <button
                className="current-numbers"
                onClick={function () {
                  setCurPage(p);
                }}
              >
                {p}
              </button>
            );
          })}
        </div>
        <button
          className="arrow"
          onClick={nextPage}
          disabled={curPage === totalPage}
        >
          <img src={rightArrow} />
        </button>
      </div>
    </div>
  );
};

export default Investment;
