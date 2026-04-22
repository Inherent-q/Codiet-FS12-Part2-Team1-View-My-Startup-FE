import React, { useEffect, useState } from "react";
import "./Investment.css";
import "../components/Pagination.css";
import Pagination from "../components/Pagination";
import InvestTable from "./components/InvestTable";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Investment = () => {
  const [corps, setCorps] = useState([]);
  const [none, setNone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [curPage, setCurPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [sort, setSort] = useState("vms");
  const [order, setOrder] = useState("desc");

  useEffect(
    function () {
      const fetchData = async function () {
        //데이터 로딩 중일 때 상태값 변경
        setLoading(true);
        const res = await fetch(
          `${API_BASE_URL}/corporations/list?sort=${sort}&order=${order}&page=${curPage}`,
        );
        const data = await res.json();

        //투자현황 없을 때 상태값 변경
        if (data.data.length === 0) {
          return setNone(true);
        } else {
          setNone(false);
        }

        setCorps(data.data);
        setTotalPage(data.totalPages);
        setLoading(false);
      };
      fetchData();
    },
    [sort, order, curPage],
  );

  //정렬 변경되면 1페이지로 돌아가기
  useEffect(
    function () {
      setCurPage(1);
    },
    [sort, order],
  );

  // 투자 현황 없을 떄 문구

  const noData = function () {
    if (none) {
      return (
        <>
          <h1 className="no-data-h1">투자 현황</h1>
          <div className="no-data-message">아직 투자 현황이 없습니다.</div>
        </>
      );
    }
  };

  //페이지네이션 - 컴포넌트 연결

  const handlePageChange = function (p) {
    setCurPage(p);
  };

  return (
    <main>
      {none ? (
        noData()
      ) : (
        <div>
          <InvestTable
            sort={sort}
            order={order}
            loading={loading}
            corps={corps}
            curPage={curPage}
            setSort={setSort}
            setOrder={setOrder}
          />
          <Pagination
            page={curPage}
            totalPages={totalPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </main>
  );
};

export default Investment;
