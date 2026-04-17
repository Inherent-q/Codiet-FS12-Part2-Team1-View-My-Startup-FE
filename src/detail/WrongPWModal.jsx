import React from "react";
import ic_delete from "../assets/ic_delete.svg";

export default function WrongPWModal({ isOpen, onClose }) {
  if (!isOpen) return null;

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
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#212121",
          color: "#FFF",
          fontSize: "15px",
          padding: "24px",
          borderRadius: "16px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
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

        <p>잘못된 비밀번호로 삭제에 실패하셨습니다.</p>

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
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
}
