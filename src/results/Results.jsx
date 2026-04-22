import { useEffect, useState } from "react";
import "./style/results.css";
import { useNavigate } from "react-router-dom";
import { formatAmount } from "../home/utils/format";
import InvestModal from "./components/InvestModal.jsx";
import DropdownSort from "./components/DropdownSort.jsx";
import { useModal } from "../context/ModalContext";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function Results() {
  const navigate = useNavigate();
  const returnSelect = function () {
    navigate("/select");
  };
  const { showResult } = useModal();

  const [mySelection, setMySelection] = useState(null);
  const [comparisonSelections, setComparisonSelections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
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

  useEffect(function () {
    const load = async function () {
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
    .map(function (item) {
      return item.corp;
    })
    .filter(Boolean);

  if (isLoading) return <div className="resultsContainer">불러오는 중...</div>;
  if (error) return <div className="resultsContainer">{error}</div>;

  const allTargetCorps = [myCorp, ...compareCorps];

  const sortData = allTargetCorps.sort(function (a, b) {
    switch (selectedSort) {
      case "누적 투자금액 높은순":
        return b.accInvest - a.accInvest;
      case "누적 투자금액 낮은순":
        return a.accInvest - b.accInvest;
      case "매출액 높은순":
        return b.revenue - a.revenue;
      case "매출액 낮은순":
        return a.revenue - b.revenue;
      case "고용 인원 많은순":
        return b.hire - a.hire;
      case "고용 인원 적은순":
        return a.hire - b.hire;
      default:
        return 0;
    }
  });

  const allTargetCorps2 = [myCorp, ...compareCorps];
  const sortData2 = allTargetCorps2.sort(function (a, b) {
    switch (selectedSort2) {
      case "누적 투자금액 높은순":
        return b.accInvest - a.accInvest;
      case "누적 투자금액 낮은순":
        return a.accInvest - b.accInvest;
      case "매출액 높은순":
        return b.revenue - a.revenue;
      case "매출액 낮은순":
        return a.revenue - b.revenue;
      case "고용 인원 많은순":
        return b.hire - a.hire;
      case "고용 인원 적은순":
        return a.hire - b.hire;
      default:
        return 0;
    }
  });

  return (
    <div className="resultsContainer">
      <div className="sectionTitle">
        <span className="mainTitle">내가 선택한 기업</span>
        <button className="orangeButton" onClick={returnSelect}>
          다른 기업 비교하기
        </button>
      </div>

      <div className="selectedCard">
        {myCorp ? (
          <>
            <img
              src={myCorp.img}
              alt={myCorp.name}
              style={{
                width: "81.231px",
                height: "81.231px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <p
              style={{
                color: "#FFF",
                fontFamily: "Pretendard",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
              }}
            >
              {myCorp.name}
            </p>
            <p
              style={{
                color: "var(--gray-gray_200, #747474)",
                fontFamily: "Pretendard",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
              }}
            >
              {myCorp.category}
            </p>
          </>
        ) : (
          <p>선택된 기업이 없습니다.</p>
        )}
      </div>

      <div className="sectionTitle">
        <span className="mainTitle">비교 결과 확인하기</span>
        <DropdownSort
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          selectedSort={selectedSort}
          sortOptions={sortOptions}
          setSelectedSort={setSelectedSort}
        />
      </div>

      <table className="tableWrapperCompare">
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
          <tr className="spacer-row"></tr>
          {sortData.map(function (corp) {
            return (
              <tr key={corp.id}>
                <td>
                  <div className="imageName">
                    <img src={corp.img} alt={corp.name} />
                    {corp.name}
                  </div>
                </td>
                <td>{corp.description}</td>
                <td>{corp.category}</td>
                <td>{formatAmount(corp.accInvest)}</td>
                <td>{formatAmount(corp.revenue)}</td>
                <td>{corp.hire}명</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="sectionTitle" style={{ marginTop: "60px" }}>
        <span className="mainTitle">기업 순위 확인하기</span>
        <DropdownSort
          setIsOpen={setIsOpen2}
          isOpen={isOpen2}
          selectedSort={selectedSort2}
          sortOptions={sortOptions2}
          setSelectedSort={setSelectedSort2}
        />
      </div>

      <table className="tableWrapperRank">
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
          <tr className="spacer-row"></tr>
          {sortData2.map(function (corp, idx) {
            return (
              <tr key={`rank-${corp.id}`}>
                <td>{idx + 1}위</td>
                <td>
                  <div className="imageName">
                    <img src={corp.img} alt={corp.name} />
                    {corp.name}
                  </div>
                </td>
                <td>{corp.description}</td>
                <td>{corp.category}</td>
                <td>{formatAmount(corp.accInvest)}</td>
                <td>{formatAmount(corp.revenue)}</td>
                <td>{corp.hire}명</td>
              </tr>
            );
          })}
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
        <InvestModal
          myCorp={myCorp}
          onClose={function () {
            setShowModal(false);
          }}
          onInvestSuccess={function () {
            setShowModal(false);
            showResult("투자가 완료되었어요!", function () {
              window.location.reload();
            });
          }}
        />
      )}
    </div>
  );
}

export default Results;
