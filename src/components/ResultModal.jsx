import React from "react";
import ic_delete from "../assets/ic_delete.svg";
import "./resultModal.css";

export default function ResultModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay result-modal">
      <div className="modal-container">
        <div className="modal-header">
          <img
            src={ic_delete}
            className="close-icon"
            onClick={onClose}
            alt="닫기"
          />
        </div>

        <p className="modal-message">{message}</p>

        <button type="button" className="confirm-button" onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  );
}
