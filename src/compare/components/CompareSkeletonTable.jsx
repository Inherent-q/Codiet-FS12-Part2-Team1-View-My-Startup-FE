import "../style/compareSkeletonTable.css";

export default function CompareSkeletonBody({ rows = 10 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={`skeleton-row-${i}`} className="skeleton-row">
          <td className="rank-cell">
            <div className="compare-skeleton-cell compare-sk-w-50" />
          </td>
          <td className="name-cell">
            <div className="name-inner">
              <div className="compare-skeleton-circle" />
              <div className="compare-skeleton-cell compare-sk-w-80" />
            </div>
          </td>
          <td className="desc-cell">
            <div className="compare-skeleton-cell compare-sk-w-full" />
          </td>
          <td className="category-cell">
            <div className="compare-skeleton-cell compare-sk-w-60" />
          </td>
          <td className="count-cell">
            <div className="compare-skeleton-cell compare-sk-w-60" />
          </td>
          <td className="count-cell">
            <div className="compare-skeleton-cell compare-sk-w-60" />
          </td>
        </tr>
      ))}
    </>
  );
}
