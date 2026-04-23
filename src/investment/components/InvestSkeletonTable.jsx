import "../style/investSkeleton.css";

export default function SkeletonTable({ rows = 10 }) {
  return (
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
  );
}
