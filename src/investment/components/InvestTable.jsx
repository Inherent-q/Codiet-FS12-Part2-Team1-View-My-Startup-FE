import React from "react";
import DropdownSort from "./DropdownSort";
import InvestCorpsList from "./InvestCorpsList";
import SkeletonTable from "../../components/SkeletonTable";
import "../../components/skeleton.css";

const InvestTable = ({
  sort,
  order,
  loading,
  corps,
  curPage,
  setSort,
  setOrder,
}) => {
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
          <SkeletonTable />
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
