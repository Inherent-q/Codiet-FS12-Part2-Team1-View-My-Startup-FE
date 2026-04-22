import React from "react";
import DropdownSort from "./DropdownSort";
import InvestCorpsList from "./InvestCorpsList";

const InvestTable = ({
  sort,
  order,
  loading,
  corps,
  curPage,
  setSort,
  setOrder,
}) => {
  // 데이터 로딩 중일 때 문구
  const loadingData = function () {
    if (loading) {
      return <div className="loading-message">데이터를 로딩 중입니다.</div>;
    }
  };

  return (
    <div className="all-wrapper">
      <div className="title-sort-wrapper">
        <h1>투자 현황</h1>
        <DropdownSort
          sort={sort}
          order={order}
          setSort={setSort}
          setOrder={setOrder}
        />
      </div>
      <div>
        {loading ? (
          loadingData()
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead className="thead">
                <tr>
                  <th>순위</th>
                  <th>기업명</th>
                  <th>기업 소개</th>
                  <th>카테고리</th>
                  <th>
                    View My Startup
                    <br />
                    투자 금액
                  </th>
                  <th>실제 누적 투자 금액</th>
                </tr>
              </thead>
              <InvestCorpsList corps={corps} curPage={curPage} />
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestTable;
