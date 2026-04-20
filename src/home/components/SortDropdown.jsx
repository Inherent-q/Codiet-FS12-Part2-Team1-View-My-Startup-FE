import { forwardRef } from "react";
import { SORT_OPTIONS } from "../constants/sortOptions";
import toggleIcon from "../assets/ic_toggle.svg";

const SortDropdown = forwardRef(function SortDropdown(
  { isOpen, onToggle, sortBy, sortOrder, onSelect },
  ref,
) {
  const currentOption =
    SORT_OPTIONS.find(
      (opt) => opt.sortBy === sortBy && opt.sortOrder === sortOrder,
    ) || SORT_OPTIONS[0];

  return (
    <div className="sort-wrapper" ref={ref}>
      <button type="button" className="sort-trigger" onClick={onToggle}>
        <span>{currentOption.label}</span>
        <img src={toggleIcon} alt="" className="sort-icon" />
      </button>

      {isOpen && (
        <div className="sort-dropdown">
          {SORT_OPTIONS.map((opt, index) => {
            const className = [
              "sort-option",
              index === 0 && "first",
              index === SORT_OPTIONS.length - 1 && "last",
              opt.sortBy === sortBy &&
                opt.sortOrder === sortOrder &&
                "selected",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                type="button"
                key={`${opt.sortBy}_${opt.sortOrder}`}
                className={className}
                onClick={() => onSelect(opt)}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default SortDropdown;
