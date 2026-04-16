import React from "react";
import ic_delete from "../assets/ic_delete.svg";
import visiblebtn from "../assets/visiblebtn.png";

export default function WrongPWModal({
  isOpen,
  onClose,
  onDelete,
  delInvestor,
}) {
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
          backgroundColor: "#212121",
          color: "#FFF",
          padding: "24px",
          borderRadius: "16px",
        }}
      >
        비밀번호가 잘못되었습니다.
      </div>
    </div>
  );
}
