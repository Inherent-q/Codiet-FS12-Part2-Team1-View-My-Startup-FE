import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const [corpdata, setCorpdata] = useState(null);
  const [investors, setInvestors] = useState([]);

  //investors 표에 포함된 투자금액 총합
  const totalInvest = Number(
    investors?.reduce((acc, cur) => {
      return acc + BigInt(cur.amount || 0);
    }, 0n),
  );

  // 더보기 메뉴 열림 닫힘 관리
  const [isOpen, setIsOpenId] = useState(null);

  const toggleDropdown = (id) => {
    setIsOpenId(isOpen === id ? null : id);
  };

  // 투자자 정보 페이지 네이션을 위한 상태 변수
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 현재 페이지에 보여줄 투자자 리스트
  const currentItems =
    investors?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    ) || [];

  // 전체 페이지 수
  const totalPages = Math.ceil(investors.length / itemsPerPage);

  const fetchinfo = () => {
    fetch(`http://localhost:8080/api/corporations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCorpdata(data);
      });

    fetch(`http://localhost:8080/api/corporations/${id}/investors`)
      .then((res) => res.json())
      .then((data) => {
        setInvestors(data);
      });
  };

  useEffect(() => {
    fetchinfo();
  }, [id]);

  const deleteInvest = () => {
    fetch(`http://localhost:8080/api/investors/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        fetchinfo();
      }
    });
  };

  const addInvest = () => {};

  return (
    // 상단 프로필 섹션
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "55px",
        justifyContent: "center",
        alignItems: "flex-start",
        margin: "40px auto",
        width: "1200px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "18px",
          alignItems: "center",
          paddingBottom: "32px",
          borderBottom: "solid 1px #2E2E2E",
        }}
      >
        <img
          src={corpdata?.img}
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ fontSize: "24px", fontWeight: "700" }}>
            {corpdata?.name}
          </p>
          <p style={{ color: "#747474", fontSize: "20px", fontWeight: "500" }}>
            {corpdata?.category}
          </p>
        </div>
      </div>
      {/* 상단 누적투자금액/매출액/고용인원 섹션 */}
      <div
        style={{
          display: "flex",
          gap: "24px",
        }}
      >
        <p
          style={{
            width: "385px",
            height: "90px",
            display: "flex",
            justifyContent: "space-between",
            padding: "36px 24px",
            backgroundColor: "#282828",
            borderRadius: "10px",
          }}
        >
          <span style={{ color: "#D8D8D8", fontWeight: "400" }}>
            누적 투자 금액
          </span>
          <span style={{ color: "#FFF", fontWeight: "600" }}>
            {Math.floor(corpdata?.accInvest / 100000000)}억 원
          </span>
        </p>
        <p
          style={{
            width: "385px",
            height: "90px",
            display: "flex",
            justifyContent: "space-between",
            padding: "36px 24px",
            backgroundColor: "#282828",
            borderRadius: "10px",
          }}
        >
          <span style={{ color: "#D8D8D8", fontWeight: "400" }}>매출액</span>
          <span style={{ color: "#FFF", fontWeight: "600" }}>
            {Math.floor(corpdata?.revenue / 100000000)}억 원
          </span>
        </p>
        <p
          style={{
            width: "385px",
            height: "90px",
            display: "flex",
            justifyContent: "space-between",
            padding: "36px 24px",
            backgroundColor: "#282828",
            borderRadius: "10px",
          }}
        >
          <span style={{ color: "#D8D8D8", fontWeight: "400" }}>고용 인원</span>
          <span style={{ color: "#FFF", fontWeight: "600" }}>
            {corpdata?.hire}명
          </span>
        </p>
      </div>
      {/* 기업 소개 섹션 */}
      <div
        style={{
          width: "100%",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          backgroundColor: "#282828",
          borderRadius: "10px",
        }}
      >
        <p style={{ color: "#FFF", fontWeight: "600" }}>기업 소개</p>
        <p style={{ color: "#D8D8D8", fontWeight: "400", fontSize: "14px" }}>
          {corpdata?.description}
        </p>
      </div>
      {/* 기업투자하기 섹션 */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "24px",
            borderBottom: "solid 1px #2E2E2E",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            View My Startup에서 받은 투자
          </span>
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40px",
              padding: "8px 24px",
              borderRadius: "50px",
              background: "#EB5230",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
            }}
            onClick={() => addInvest}
          >
            기업투자하기
          </button>
        </div>
        <div style={{ fontSize: "20px", fontWeight: "700" }}>
          총 {Math.floor(totalInvest / 100000000)}억 원
        </div>
        {/* 투자자 표 섹션 */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            fontSize: "14px",
          }}
        >
          {/* 1. 표 헤더 */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              backgroundColor: "#282828",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            <span
              style={{
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "84px",
                padding: "10px",
              }}
            >
              투자자 이름
            </span>
            <span
              style={{
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "84px",
                padding: "10px",
              }}
            >
              순위
            </span>
            <span
              style={{
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "84px",
                padding: "10px",
              }}
            >
              투자 금액
            </span>
            <span
              style={{
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "884px",
                padding: "10px",
              }}
            >
              투자 코멘트
            </span>
          </div>

          {/* 2. 리스트 렌더링 */}
          <div
            style={{
              backgroundColor: "#282828",
              borderRadius: "4px",
              color: "#D8D8D8",
            }}
          >
            {currentItems.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  borderBottom: "solid 1px #2E2E2E",
                  gap: "10px",
                  alignSelf: "stretch",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "64px",
                    width: "84px",
                    padding: "15px 16px",
                    alignItems: "center",
                  }}
                >
                  {item.name}
                </span>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "64px",
                    width: "84px",
                    padding: "15px 16px",
                    alignItems: "center",
                  }}
                >
                  {(currentPage - 1) * itemsPerPage + index + 1}위
                </span>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "64px",
                    width: "84px",
                    padding: "15px 16px",
                    alignItems: "center",
                  }}
                >
                  {Math.floor(item.amount / 100000000)}억 원
                </span>
                <span
                  style={{
                    display: "flex",
                    height: "64px",
                    width: "884px",
                    padding: "15px 16px",
                    alignItems: "center",
                  }}
                >
                  {item.comment}
                </span>
                {/* 더보기 버튼 */}
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "22px",
                      fontWeight: "900",
                      color: "#C5C5C5",
                    }}
                    onClick={() => toggleDropdown(item.id)}
                  >
                    ⋮
                  </button>

                  {/* 드롭 다운 메뉴 */}
                  {isOpen === item.id && (
                    <div
                      style={{
                        position: "absolute",
                        top: "45px",
                        right: "5px",
                        border: "none",
                        width: "144px",
                        zIndex: 100,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        color: "#D8D8D8",
                      }}
                    >
                      <button
                        style={{
                          height: "40px",
                          backgroundColor: "#131313",
                          border: "solid 1px #747474",
                          borderTopLeftRadius: "10px",
                          borderTopRightRadius: "10px",
                          cursor: "pointer",
                        }}
                      >
                        수정하기
                      </button>
                      <button
                        style={{
                          height: "40px",
                          backgroundColor: "#131313",
                          border: "solid 1px #747474",
                          borderTop: "none",
                          borderBottomLeftRadius: "10px",
                          borderBottomRightRadius: "10px",
                          cursor: "pointer",
                        }}
                      >
                        삭제하기
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 3. 페이지네이션 UI */}
          {totalPages > 0 && (
            <div
              style={{ display: "flex", justifyContent: "center", gap: "8px" }}
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#2E2E2E",
                  color: "#747474",
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  style={
                    currentPage === i + 1
                      ? {
                          width: "48px",
                          height: "48px",
                          borderRadius: "8px",
                          border: "none",
                          backgroundColor: "#EB5230",
                          color: "#FFF",
                          fontSize: "18px",
                          fontWeight: "400",
                        }
                      : {
                          width: "48px",
                          height: "48px",
                          borderRadius: "8px",
                          border: "none",
                          backgroundColor: "#2E2E2E",
                          color: "#747474",
                          fontSize: "18px",
                          fontWeight: "400",
                        }
                  }
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#2E2E2E",
                  color: "#747474",
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
