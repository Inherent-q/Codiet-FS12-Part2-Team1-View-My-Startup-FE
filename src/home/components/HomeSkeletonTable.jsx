import "../style/homeSkeletonTable.css";

export default function HomeSkeletonTable({ rows = 10 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="home-skeleton-row">
          <td className="home-rank-cell">
            <div className="home-skeleton-cell w-50" />
          </td>
          <td className="home-name-cell">
            <div className="home-name-inner">
              <div className="home-skeleton-circle" />
              <div className="home-skeleton-cell w-80" />
            </div>
          </td>
          <td className="home-desc-cell">
            <div className="home-skeleton-cell w-full" />
          </td>
          <td className="home-category-cell">
            <div className="home-skeleton-cell w-60" />
          </td>
          <td className="home-number-cell home-accinvest-cell">
            <div className="home-skeleton-cell w-60" />
          </td>
          <td className="home-number-cell home-revenue-cell">
            <div className="home-skeleton-cell w-60" />
          </td>
          <td className="home-hire-cell">
            <div className="home-skeleton-cell w-50" />
          </td>
        </tr>
      ))}
    </>
  );
}
