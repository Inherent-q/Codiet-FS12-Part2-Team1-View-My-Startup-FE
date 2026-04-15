import React from "react";

export default function AuthenticationModal({
  isOpen,
  onClose,
  onDelete,
  investor,
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "white",
          color: "black",
        }}
      >
        <p>삭제 권한 인증</p>
        <form>
          <p>비밀번호</p>
          <input placeholder="패스워드를 입력해주세요" />
          <button>삭제하기</button>
        </form>
      </div>
      <button></button>
    </div>
  );
}
