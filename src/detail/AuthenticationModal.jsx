import React, { useState } from "react";
import ic_delete from "../assets/ic_delete.svg";
import onpassword from "../assets/onpassword.png";
import DeleteModal from "./DeleteModal";
import WrongPWModal from "./WrongPWModal";

export default function AuthenticationModal({
  isOpen,
  onClose,
  onDelete,
  delInvestor,
}) {
  if (!isOpen) return null;

  // 비밀번호 관리 useState
  const [password, setPassword] = useState("");
  // 페이지 분기 useState
  const [modalType, setModalType] = useState(null);
  // 비밀번호 visiblebtn 클릭 시 입력 글자 암호화 토글
  const [showPassword, setShowPassword] = useState(false);

  // 인증 form 제출 시 작동 함수
  const handleAuth = () => {
    if (delInvestor && delInvestor.password === password) {
      setModalType("success");
    } else {
      setModalType("fail");
    }
  };

  // 화면 닫을 시 작동 함수
  const handleCloseAll = () => {
    setModalType(null);
    setPassword("");
    onClose();
  };

  //폼 제출 결과 모달타입이 성공인 경우,
  if (modalType === "success") {
    return (
      <DeleteModal
        isOpen={isOpen}
        onClose={handleCloseAll}
        onDelete={() => {
          onDelete();
          alert("삭제되었습니다!");
          handleCloseAll();
        }}
      />
    );
  }

  //폼 제출 결과 모달타입이 실패인 경우,
  if (modalType === "fail") {
    return <WrongPWModal isOpen={isOpen} onClose={handleCloseAll} />;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: "500px",
          backgroundColor: "#212121",
          color: "#FFF",
          padding: "24px",
          borderRadius: "16px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              width: "150px",
              height: "24px",
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "24px",
            }}
          >
            삭제 권한 인증
          </p>
          <img
            src={ic_delete}
            style={{
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
            onClick={onClose}
          />
        </div>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div style={{ width: "100%" }}>
            <p
              style={{
                width: "150px",
                height: "24px",
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "24px",
              }}
            >
              비밀번호
            </p>
            <div
              style={{
                width: "100%",
                height: "48px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                border: "1px solid #747474",
                borderRadius: "10px",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="패스워드를 입력해주세요"
                style={{
                  width: "90%",
                  background: "none",
                  border: "none",
                  fontSize: "14px",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={onpassword}
                style={{
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          <button
            type="button"
            style={{
              width: "194px",
              height: "48px",
              padding: "13px 48px",
              borderRadius: "50px",
              border: "none",
              backgroundColor: "#EB5230",
              color: "#FFF",
              fontSize: "16px",
              fontWeight: "600",
              marginTop: "16px",
              cursor: "pointer",
            }}
            onClick={handleAuth}
          >
            삭제하기
          </button>
        </form>
      </div>
    </div>
  );
}
