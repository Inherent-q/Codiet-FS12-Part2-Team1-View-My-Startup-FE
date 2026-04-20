export default function SkeletonTable({ rows = 10 }) {
  return (
    <table className="company-table">
      <thead>
        <tr>
          <th className="th-rank">순위</th>
          <th className="th-name">기업 명</th>
          <th className="th-desc">기업 소개</th>
          <th className="th-category">카테고리</th>
          <th className="th-number">누적 투자 금액</th>
          <th className="th-number">매출액</th>
          <th className="th-number">고용 인원</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i} className="company-row">
            <td className="rank-cell">
              <div className="skeleton-cell w-50" />
            </td>
            <td className="name-cell">
              <div className="name-inner">
                <div className="skeleton-circle" />
                <div className="skeleton-cell w-80" />
              </div>
            </td>
            <td className="desc-cell">
              <div className="skeleton-cell w-full" />
            </td>
            <td className="category-cell">
              <div className="skeleton-cell w-60" />
            </td>
            <td className="number-cell">
              <div className="skeleton-cell w-60" />
            </td>
            <td className="number-cell">
              <div className="skeleton-cell w-60" />
            </td>
            <td className="number-cell">
              <div className="skeleton-cell w-50" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
