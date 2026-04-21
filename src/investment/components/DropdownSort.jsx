import React, { useState } from "react";
import toggleImage from "../../assets/toggle.svg";

const DropdownSort = ({ sort, order, setSort, setOrder }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = function () {
    setToggle(!toggle);
  };

  const dropdown = function () {
    if (toggle === true) {
      return (
        <div className="sort-options">
          <button className="vms-desc" onClick={handleVMSDesc}>
            View My Startup 투자 금액 높은순
          </button>
          <button className="vms-asc" onClick={handleVMSAsc}>
            View My Startup 투자 금액 낮은순
          </button>
          <button className="amount-desc" onClick={handleAccDesc}>
            실제 누적 투자 금액 높은순
          </button>
          <button className="amount-asc" onClick={handleAccAsc}>
            실제 누적 투자 금액 낮은순
          </button>
        </div>
      );
    } else {
      return;
    }
  };

  const handleVMSDesc = function () {
    setSort("vms");
    setOrder("desc");
    setToggle(!toggle);
  };
  const handleVMSAsc = function () {
    setSort("vms");
    setOrder("asc");
    setToggle(!toggle);
  };
  const handleAccDesc = function () {
    setSort("accInvest");
    setOrder("desc");
    setToggle(!toggle);
  };
  const handleAccAsc = function () {
    setSort("accInvest");
    setOrder("asc");
    setToggle(!toggle);
  };

  const sortText = function () {
    if (sort === "vms" && order === "desc") {
      return "View My Startup 투자 금액 높은순";
    } else if (sort === "vms" && order === "asc") {
      return "View My Startup 투자 금액 낮은순";
    } else if (sort === "accInvest" && order === "desc") {
      return "실제 누적 투자 금액 높은순";
    } else if (sort === "accInvest" && order === "asc") {
      return "실제 누적 투자 금액 낮은순";
    } else {
      return "View My Startup 투자 금액 높은순";
    }
  };

  return (
    <div className="dropdown-wrapper">
      <div className="dropdown-board">
        <button className="sort-btn" onClick={handleToggle}>
          {sortText()}
        </button>
        <button className="dropdown-toggle" onClick={handleToggle}>
          <img src={toggleImage} />
        </button>
      </div>
      <div className="sort-options-wrapper">{dropdown()}</div>
    </div>
  );
};

export default DropdownSort;
