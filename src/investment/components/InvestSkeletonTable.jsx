import "../style/investSkeleton.css";

export default function SkeletonTable({ rows = 10 }) {
  return (
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
        <tbody>
          <tr className="gap"></tr>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="tbody-tr">
              <td className="rank">
                <div className="skeleton-cell" />
              </td>
              <td className="corp-name">
                <div className="skeleton-circle" />
                <div className="skeleton-cell" />
              </td>
              <td className="corp-descrip">
                <div className="skeleton-cell" />
              </td>
              <td className="category">
                <div className="skeleton-cell" />
              </td>
              <td className="vms-acc">
                <div className="skeleton-cell" />
              </td>
              <td className="accinvest">
                <div className="skeleton-cell" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
