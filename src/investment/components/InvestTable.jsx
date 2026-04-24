import React from "react";
import DropdownSort from "./DropdownSort";
import InvestCorpsList from "./InvestCorpsList";
import "../style/investSkeleton.css";
import InvestSkeletonTable from "./InvestSkeletonTable";

const InvestTable = ({
  sort,
  order,
  loading,
  corps,
  curPage,
  setSort,
  setOrder,
}) => {
  const hasData = corps && corps.length > 0;

  return (
    <div className="all-wrapper">
      <div className="title-sort-wrapper">
        <h1 className="title">투자 현황</h1>
        <DropdownSort
          sort={sort}
          order={order}
          setSort={setSort}
          setOrder={setOrder}
        />
      </div>
      <div>
        <div className="table-wrapper">
          <table className="invest-table">
            <thead className="invest-thead">
              <tr>
                <th className="rank-th">순위</th>
                <th className="corp-name-th">기업 명</th>
                <th className="corp-descrip-th">기업 소개</th>
                <th className="category-th">카테고리</th>
                <th className="vms-th">
                  View My Startup
                  <br />
                  투자 금액
                </th>
                <th className="accinvest-th">실제 누적 투자 금액</th>
              </tr>
            </thead>
            <tbody className={`invest-tbody ${loading ? "loading" : ""} `}>
              {loading && !hasData ? (
                <InvestSkeletonTable />
              ) : (
                <InvestCorpsList corps={corps} curPage={curPage} />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvestTable;
