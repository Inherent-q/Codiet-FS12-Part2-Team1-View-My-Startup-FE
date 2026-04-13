import { Routes, Route, Link } from "react-router-dom";
import GNB from "./components/GNB";
import "./Results/style/results.css";
import { useState } from "react";
import toggleIcon from "./assets/togglebtn.png";

function App() {
  return (
    <>
      <GNB />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<Select />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/investment" element={<Investment />} />
        <Route path="/results" element={<Results />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </>
  );
}

function Home() {
  return (
    <div>
      <h1>기업 전체 리스트 조회 페이지</h1>
      <Link to="/results">Results 바로가기</Link>
    </div>
  );
}

function Select() {
  return <h1>나의 기업 비교 선택 페이지</h1>;
}

function Compare() {
  return <h1>비교 현황 페이지</h1>;
}

function Investment() {
  return <h1>투자 현황 페이지</h1>;
}

function Results() {
  const [showModal, setShowModal] = useState(false);
  const [investModal, setInvestModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("누적 투자금액 높은순");
  const sortOptions = [
    "누적 투자금액 높은순",
    "누적 투자금액 낮은순",
    "매출액 높은순",
    "매출액 낮은순",
    "고용 인원 많은순",
    "고용 인원 적은순",
  ];

  return (
    <div className="resultsContainer">
      <div className="sectionTitle">
        <span className="mainTitle">내가 선택한 기업</span>
        <button className="orangeButton">다른 기업 비교하기</button>
      </div>

      <div className="selectedCard"></div>

      <div className="sectionTitle">
        <span className="mainTitle">비교 결과 확인하기</span>
        <div className="dropdownContainer" onClick={() => setIsOpen(!isOpen)}>
          <span className="dropdownText">{selectedSort}</span>
          <img
            src={toggleIcon}
            alt="Toggle Dropdown"
            className="dropdownIcon"
          />

          {isOpen && (
            <ul className="dropdownList">
              {sortOptions.map((option) => (
                <li
                  key={option}
                  className="dropdownItem"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSort(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <table className="tableWrapper">
        <thead className="tableHeader">
          <tr>
            <th>기업 명</th>
            <th>기업 소개</th>
            <th>카테고리</th>
            <th>누적 투자 금액</th>
            <th>매출액</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      <div className="sectionTitle" style={{ marginTop: "60px" }}>
        <span className="mainTitle">기업 순위 확인하기</span>
        <select className="sortDropdown">
          <option value="investment_desc">누적 투자금액 높은순</option>
          <option value="investment_asc">누적 투자금액 낮은순</option>
          <option value="revenue_desc">매출액 높은순</option>
          <option value="revenue_asc">매출액 낮은순</option>
          <option value="employees_desc">고용 인원 많은순</option>
          <option value="employees_asc">고용 인원 적은순</option>
        </select>
      </div>

      <table className="tableWrapper">
        <thead className="tableHeader">
          <tr>
            <th>순위</th>
            <th>기업 명</th>
            <th>기업 소개</th>
            <th>카테고리</th>
            <th>누적 투자 금액</th>
            <th>매출액</th>
            <th>고용 인원</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}
      >
        <button
          className="orangeButton"
          onClick={function () {
            setShowModal(true);
          }}
        >
          나의 기업에 투자하기
        </button>
      </div>
      {showModal && (
        <div className="modalOverlay">
          <div className="modalContent large">
            <button
              className="closeModalButton"
              onClick={() => setShowModal(false)}
            >
              X
            </button>

            <h2 className="modalTitle">기업에 투자하기</h2>

            <div className="inputGroup">
              <label className="inputLabel">투자자 이름</label>
              <input
                className="modalInput"
                type="text"
                placeholder="투자자 이름을 입력해 주세요"
              />
            </div>

            <div className="inputGroup">
              <label className="inputLabel">투자 금액</label>
              <input
                className="modalInput"
                type="number"
                placeholder="투자 금액을 입력해 주세요"
              />
            </div>

            <div className="inputGroup">
              <label className="inputLabel">투자 코멘트</label>
              <textarea
                className="modalTextarea"
                placeholder="투자 코멘트를 입력해 주세요"
              />
            </div>
            <div className="inputGroup">
              <label className="inputLabel">비밀번호</label>
              <input
                className="modalInput"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
              />
            </div>

            <div className="inputGroup">
              <label className="inputLabel">비밀번호 확인</label>
              <input
                className="modalInput"
                type="password"
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
              />
            </div>

            <div className="modalFooter">
              <button
                className="orangeButton cancel"
                onClick={() => setShowModal(false)}
              >
                취소
              </button>
              <button
                className="orangeButton"
                onClick={() => {
                  setShowModal(false);
                  setInvestModal(true);
                }}
              >
                투자하기
              </button>
            </div>
          </div>
        </div>
      )}
      {investModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button
              className="closeModalButton"
              onClick={() => setInvestModal(false)}
            >
              X
            </button>
            <h3 className="successMessage">투자가 완료되었어요!</h3>
            <button
              className="orangeButton"
              onClick={() => setInvestModal(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail() {
  return <h1>기업상세 페이지</h1>;
}

export default App;
