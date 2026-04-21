import ic_delete from "../assets/ic_delete.svg";
import "./alertModal.css";

export default function AlertModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen || !message) return null;

  return (
    <div className="alert-modal">
      <div className="modal-overlay">
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

          <button
            type="button"
            className="confirm-button"
            onClick={onConfirm ?? onClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
