import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import AuthenticationModal from "./AuthenticationModal.jsx";
<<<<<<< HEAD
import Pagination from "../compare/components/Pagination.jsx";
=======
import EditInvestModal from "./components/EditInvestModal.jsx";
>>>>>>> dev
import "./style/detail.css";

export default function Detail() {
  const { showResult, showError } = useModal();
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

  // 삭제 모달 props 변수
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [selectedDelId, setSelectedDelId] = useState(null);
  const [selectInvestor, setSelectInvestor] = useState({});

  // 수정 모달 state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const handleDeleteClick = (id, invest) => {
    setSelectedDelId(id); // 삭제할 ID 저장
    setIsDelModalOpen(true); // 모달 열기
    setSelectInvestor(invest); // 삭제할 투자 객체 전달
  };

  const confirmDelete = () => {
    console.log(`${selectedDelId} 삭제 진행됨`);
    deleteInvest(selectedDelId);
    setIsDelModalOpen(false); // 삭제 후 모달 닫기
  };

  const handleEditClick = (item) => {
    setEditTarget({ ...item });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (password) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/investors/${editTarget.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editTarget.name,
            amount: editTarget.amount,
            comment: editTarget.comment,
            password: password,
          }),
        },
      );

      if (res.ok) {
        showResult("수정이 완료되었습니다.", () => {
          setIsEditModalOpen(false);
          setEditTarget(null);
          fetchinfo();
        });
      } else if (res.status === 401) {
        showError("비밀번호가 일치하지 않습니다.");
      } else {
        showError("수정에 실패했습니다.");
      }
    } catch (error) {
      console.error(error.message);
      showError("오류가 발생했습니다.");
    }
  };

  const fetchinfo = () => {
    fetch(`http://localhost:3000/api/corporations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCorpdata(data);
      });

    fetch(`http://localhost:3000/api/corporations/${id}/investors`)
      .then((res) => res.json())
      .then((data) => {
        setInvestors(data);
      });
  };

  useEffect(() => {
    fetchinfo();
  }, [id]);

  const deleteInvest = (targetId) => {
    try {
      const res = fetch(`http://localhost:3000/api/investors/${targetId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchinfo();
      } else {
        console.error(res.status);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const addInvest = () => {};

  return (
    // 상단 프로필 섹션
    <div className="base">
      <div className="profile-section">
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
          <p className="profile-name">{corpdata?.name}</p>
          <p style={{ color: "#747474", fontSize: "20px", fontWeight: "500" }}>
            {corpdata?.category}
          </p>
        </div>
      </div>

      {/* 상단 누적투자금액/매출액/고용인원 섹션 */}
      <div className="profile-detail">
        <p className="profile-box">
          <span style={{ color: "#D8D8D8", fontWeight: "400" }}>
            누적 투자 금액
          </span>
          <span style={{ color: "#FFF", fontWeight: "600" }}>
            {Math.floor(corpdata?.accInvest / 100000000)}억 원
          </span>
        </p>
        <p className="profile-box">
          <span style={{ color: "#D8D8D8", fontWeight: "400" }}>매출액</span>
          <span style={{ color: "#FFF", fontWeight: "600" }}>
            {Math.floor(corpdata?.revenue / 100000000)}억 원
          </span>
        </p>
        <p className="profile-box">
          <span style={{ color: "#D8D8D8", fontWeight: "400" }}>고용 인원</span>
          <span style={{ color: "#FFF", fontWeight: "600" }}>
            {corpdata?.hire}명
          </span>
        </p>
      </div>

      {/* 기업 소개 섹션 */}
      <div className="profile-description">
        <p style={{ color: "#FFF", fontWeight: "600" }}>기업 소개</p>
        <p style={{ color: "#D8D8D8", fontWeight: "400", fontSize: "14px" }}>
          {corpdata?.description}
        </p>
      </div>

      {/* 기업투자하기 섹션 */}
      <div style={{ width: "100%" }}>
        <div className="addInvest-section">
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            View My Startup에서 받은 투자
          </span>
          <button className="addInvest-btn" onClick={() => addInvest}>
            기업투자하기
          </button>
        </div>
        <div
          style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}
        >
          총 {Math.floor(totalInvest / 100000000)}억 원
        </div>

        {/* 투자자 표 섹션 */}
        <div className="table-section">
          {investors.length > 0 ? (
            <>
              {/* 1. 표 헤더 */}
              <div className="table-header">
                <span className="table-column">투자자 이름</span>
                <span className="table-column">순위</span>
                <span className="table-column">투자 금액</span>
                <span className="table-column2">투자 코멘트</span>
              </div>

              {/* 2. 리스트 렌더링 */}
              <div className="table-body">
                {currentItems.map((item, index) => (
                  <div key={item.id} className="table-list">
                    <span className="table-row">{item.name}</span>
                    <span className="table-row">
                      {(currentPage - 1) * itemsPerPage + index + 1}위
                    </span>
                    <span className="table-row">
                      {Math.floor(item.amount / 100000000)}억 원
                    </span>
                    <span className="table-row2">{item.comment}</span>

                    {/* 더보기 버튼 */}
                    <div className="tablebtn-section">
                      <button
                        className="more-btn"
                        onClick={() => toggleDropdown(item.id)}
                      >
                        ⋮
                      </button>

                      {/* 드롭 다운 메뉴 */}
                      {isOpen === item.id && (
                        <div className="drop-box">
                          <button
                            className="dropbox-btn1"
                            onClick={() => {
                              handleEditClick(item);
                              setIsOpenId(null);
                            }}
                          >
                            수정하기
                          </button>
                          <button
                            className="dropbox-btn2"
                            onClick={() => {
                              handleDeleteClick(item.id, item);
                              setIsOpenId(null);
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

              {/* 3. 페이지네이션 UI : 컴포넌트 분리 */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="noinvest">
              아직 투자한 기업이 없어요, <br />
              버튼을 눌러 기업에 투자해보세요!
            </div>
          )}
        </div>
      </div>

      <AuthenticationModal
        isOpen={isDelModalOpen}
        onClose={() => setIsDelModalOpen(false)}
        onDelete={confirmDelete}
        delInvestor={selectInvestor}
      />

      {isEditModalOpen && (
        <EditInvestModal
          corpdata={corpdata}
          editTarget={editTarget}
          setEditTarget={setEditTarget}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditTarget(null);
          }}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
}
