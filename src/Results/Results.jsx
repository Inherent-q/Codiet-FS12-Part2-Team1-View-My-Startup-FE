import { useEffect, useState } from "react";
import toggleIcon from "../assets/togglebtn.png";
import vectorIcon from "../assets/vector.png";
import togglepassword from "../assets/onpassword.png";
import toggleoffpassword from "../assets/offpassword.png";
import "./style/results.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function Results() {
  const [mySelection, setMySelection] = useState(null);
  const [comparisonSelections, setComparisonSelections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
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
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedSort2, setSelectedSort2] = useState("누적 투자금액 높은순");
  const sortOptions2 = [
    "누적 투자금액 높은순",
    "누적 투자금액 낮은순",
    "매출액 높은순",
    "매출액 낮은순",
    "고용 인원 많은순",
    "고용 인원 적은순",
  ];
  const [passwordVisible, setpasswordVisible] = useState(false);
  const [passwordVisible2, setpasswordVisible2] = useState(false);

  function passwordInput() {
    setpasswordVisible(!passwordVisible);
  }
  function passwordInput2() {
    setpasswordVisible2(!passwordVisible2);
  }
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError("");

        const userSessionId = localStorage.getItem("my_startup_session_id");
        if (!userSessionId) {
          setError("세션 정보가 없습니다. /select에서 다시 선택해 주세요.");
          return;
        }

        const [myRes, compRes] = await Promise.all([
          fetch(`${API_BASE_URL}/my-selection?userSessionId=${userSessionId}`),
          fetch(
            `${API_BASE_URL}/comparison-selections?userSessionId=${userSessionId}`,
          ),
        ]);

        if (!myRes.ok || !compRes.ok) throw new Error("fetch failed");

        const myPayload = await myRes.json();
        const compPayload = await compRes.json();

        setMySelection(myPayload?.success ? myPayload.data : null);
        setComparisonSelections(
          compPayload?.success && Array.isArray(compPayload.data)
            ? compPayload.data
            : [],
        );
      } catch (error) {
        console.error("Data fetch error:", error);
        setError("결과 데이터를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const myCorp = mySelection?.corp ?? null;
  const compareCorps = comparisonSelections
    .map((item) => item.corp)
    .filter(Boolean);

  if (isLoading) return <div className="resultsContainer">불러오는 중...</div>;
  if (error) return <div className="resultsContainer">{error}</div>;

  return (
    <div className="resultsContainer">
      <div className="sectionTitle">
        <span className="mainTitle">내가 선택한 기업</span>
        <button className="orangeButton">다른 기업 비교하기</button>
      </div>

      <div className="selectedCard">
        {myCorp ? (
          <>
            <p>{myCorp.name}</p>
            <p>{myCorp.category}</p>
          </>
        ) : (
          <p>선택된 기업이 없습니다.</p>
        )}
      </div>

      <div className="sectionTitle">
        <span className="mainTitle">비교 결과 확인하기</span>
        <div
          className="dropdownContainer"
          onClick={function () {
            setIsOpen(!isOpen);
          }}
        >
          <span className="dropdownText">{selectedSort}</span>
          <img
            src={toggleIcon}
            alt="Toggle Dropdown"
            className="dropdownIcon"
          />

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
      </div>

      <table className="tableWrapper">
        <thead className="tableHeader compareHeader">
          <tr>
            <th>기업 명</th>
            <th>기업 소개</th>
            <th>카테고리</th>
            <th>누적 투자 금액</th>
            <th>매출액</th>
            <th>고용 인원</th>
          </tr>
        </thead>
        <tbody>
          {compareCorps.map((corp) => (
            <tr key={corp.id}>
              <td>{corp.name}</td>
              <td>{corp.description}</td>
              <td>{corp.category}</td>
              <td>{corp.accInvest}</td>
              <td>{corp.revenue}</td>
              <td>{corp.hire}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="sectionTitle" style={{ marginTop: "60px" }}>
        <span className="mainTitle">기업 순위 확인하기</span>
        <div
          className="dropdownContainer"
          onClick={function () {
            setIsOpen2(!isOpen2);
          }}
        >
          <span className="dropdownText">{selectedSort2}</span>
          <img
            src={toggleIcon}
            alt="Toggle Dropdown"
            className="dropdownIcon"
          />

          {isOpen2 && (
            <ul className="dropdownList">
              {sortOptions2.map(function (option2) {
                return (
                  <li
                    key={option2}
                    className="dropdownItem"
                    onClick={function (e) {
                      e.stopPropagation();
                      setSelectedSort2(option2);
                      setIsOpen2(false);
                    }}
                  >
                    {option2}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <table className="tableWrapper">
        <thead className="tableHeader rankHeader">
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
        <tbody>
          {compareCorps.map((corp, idx) => (
            <tr key={`rank-${corp.id}`}>
              <td>{idx + 1}위</td>
              <td>{corp.name}</td>
              <td>{corp.description}</td>
              <td>{corp.category}</td>
              <td>{corp.accInvest}</td>
              <td>{corp.revenue}</td>
              <td>{corp.hire}</td>
            </tr>
          ))}
        </tbody>
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
          <div className="modalContentlarge">
            <div className="largemodalTop">
              <label className="mainTitle">기업에 투자하기</label>
              <img
                src={vectorIcon}
                alt="닫음"
                style={{ width: "20.333px", height: "20.333px" }}
                onClick={function () {
                  setShowModal(false);
                }}
              />
            </div>

            <div>
              <label className="inputLabel">투자 기업 정보</label>
            </div>

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
                type="text"
                placeholder="투자 금액을 입력해 주세요"
              />
            </div>

            <div className="inputGroup">
              <label className="inputLabel">투자 코멘트</label>
              <textarea
                className="modalInput2"
                placeholder="투자 코멘트를 입력해 주세요"
              />
            </div>

            <div className="inputGroup">
              <label className="inputLabel">비밀번호</label>
              <div className="inputContainer">
                <input
                  className="modalInput"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="비밀번호를 입력해 주세요"
                />
                <img
                  className="eyeIcon"
                  onClick={function () {
                    passwordInput();
                  }}
                  src={passwordVisible ? togglepassword : toggleoffpassword}
                  alt="눈"
                />
              </div>
            </div>

            <div className="inputGroup">
              <label className="inputLabel">비밀번호 확인</label>
              <div className="inputContainer">
                <input
                  className="modalInput"
                  type={passwordVisible2 ? "text" : "password"}
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                />
                <img
                  className="eyeIcon"
                  onClick={function () {
                    passwordInput2();
                  }}
                  src={passwordVisible2 ? togglepassword : toggleoffpassword}
                  alt="눈"
                />
              </div>
            </div>

            <div className="modalFooter">
              <button
                className="orangeButton cancel"
                onClick={function () {
                  setShowModal(false);
                }}
              >
                취소
              </button>
              <button
                className="orangeButton"
                onClick={function () {
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
            <img
              src={vectorIcon}
              alt="닫음"
              style={{
                width: "20.333px",
                height: "20.333px",
                alignSelf: "flex-end",
              }}
              onClick={function () {
                setInvestModal(false);
              }}
            />
            <div className="buttonGroup">
              <h3 className="successMessage">투자가 완료되었어요!</h3>
              <button
                className="orangeButton"
                onClick={function () {
                  setInvestModal(false);
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
