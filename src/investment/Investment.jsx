import React, { useEffect, useState } from "react";
import "./style/investment.css";
import "../components/Pagination.css";
import Pagination from "../components/Pagination";
import InvestTable from "./components/InvestTable";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Investment = () => {
  const [corps, setCorps] = useState([]);
  const [none, setNone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [sort, setSort] = useState("vms");
  const [order, setOrder] = useState("desc");

  useEffect(
    function () {
      const fetchData = async function () {
        //데이터 로딩중, 에러, 데이터 없을 때 상태값 변경
        setLoading(true);
        setError(false);
        setNone(false);

        try {
          const res = await fetch(
            `${API_BASE_URL}/corporations/list?sort=${sort}&order=${order}&page=${curPage}`,
          );
          const data = await res.json();

          // 데이터 없을 때 에러 발생하도록
          if (!data.data) {
            return setError(true);
          }

          //투자현황 없을 때 상태값 변경
          if (data.data.length === 0) {
            setNone(true);
          } else {
            setNone(false);
          }

          setCorps(data.data);
          setTotalPage(data.totalPages);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
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

  // 페이지네이션 바뀌면 스크롤 위로 올라가기
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [curPage]);

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

  // 데이터 못 불러올 때 나오는 문구
  const failedLoading = function () {
    if (error)
      return <div className="error-message">데이터를 불러오지 못했습니다.</div>;
  };

  return (
    <main>
      {none ? (
        noData()
      ) : (
        <div>
          {error ? (
            failedLoading()
          ) : (
            <InvestTable
              sort={sort}
              order={order}
              loading={loading}
              corps={corps}
              curPage={curPage}
              setSort={setSort}
              setOrder={setOrder}
            />
          )}
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
