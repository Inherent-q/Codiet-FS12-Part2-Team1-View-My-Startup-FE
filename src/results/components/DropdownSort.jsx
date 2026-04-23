import React from "react";
import toggleIcon from "../../assets/togglebtn.svg";

const DropdownSort = ({
  setIsOpen,
  isOpen,
  selectedSort,
  sortOptions,
  setSelectedSort,
}) => {
  return (
    <div
      className="dropdownContainer"
      onClick={function () {
        setIsOpen(!isOpen);
      }}
    >
      <span className="dropdownText">{selectedSort}</span>
      <img src={toggleIcon} alt="Toggle Dropdown" className="dropdownIcon" />
      {isOpen && (
        <ul className="dropdownList">
          {sortOptions.map(function (option) {
            return (
              <li
                key={option}
                className="dropdownItem"
                onClick={function (e) {
                  e.stopPropagation();
                  setSelectedSort(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DropdownSort;
