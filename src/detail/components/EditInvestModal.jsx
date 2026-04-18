import { useState } from "react";
import "../style/editInvestModal.css";
import icShow from "../../assets/onpassword.png";
import icHide from "../../assets/offpassword.png";
import vectorIcon from "../../assets/vector.png";

export default function EditInvestModal({
  corpdata,
  editTarget,
  setEditTarget,
  onClose,
  onSubmit,
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!editTarget) return null;

  const handleSubmit = () => {
    // 빈값 검증
    if (!editTarget.name.trim()) {
      alert("투자자 이름을 입력해주세요.");
      return;
    }
    if (!editTarget.amount) {
      alert("투자 금액을 입력해주세요.");
      return;
    }
    if (!editTarget.comment.trim()) {
      alert("투자 코멘트를 입력해주세요.");
      return;
    }
    if (!password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    onSubmit(password);
  };

  return (
    <div className="editModal-overlay">
      <div className="editModal-container">
        {/* 헤더 */}
        <div className="editModal-header">
          <span className="editModal-title">투자 정보 수정</span>
          <img
            src={vectorIcon}
            alt="닫음"
            style={{ width: "20.333px", height: "20.333px", cursor: "pointer" }}
            onClick={onClose}
          />
        </div>

        {/* 투자 기업 정보 */}
        <div className="editModal-section">
          <label className="editModal-label">투자 기업 정보</label>
          <div className="editModal-corpInfo">
            <img src={corpdata?.img} className="editModal-corpImg" />
            <span className="editModal-corpName">{corpdata?.name}</span>
            <span className="editModal-corpCategory">{corpdata?.category}</span>
          </div>
        </div>

        {/* 투자자 이름 */}
        <div className="editModal-section">
          <label className="editModal-label">투자자 이름</label>
          <input
            className="editModal-input"
            placeholder="투자자 이름을 입력해 주세요"
            value={editTarget.name}
            onChange={(e) =>
              setEditTarget({ ...editTarget, name: e.target.value })
            }
          />
        </div>

        {/* 투자 금액 */}
        <div className="editModal-section">
          <label className="editModal-label">투자 금액</label>
          <input
            className="editModal-input"
            placeholder="투자 금액을 입력해 주세요"
            value={editTarget.amount}
            onChange={(e) =>
              setEditTarget({ ...editTarget, amount: Number(e.target.value) }) 
            }
          />
        </div>

        {/* 투자 코멘트 */}
        <div className="editModal-section">
          <label className="editModal-label">투자 코멘트</label>
          <textarea
            className="editModal-textarea"
            placeholder="투자에 대한 코멘트를 입력해 주세요"
            value={editTarget.comment}
            onChange={(e) =>
              setEditTarget({ ...editTarget, comment: e.target.value })
            }
            rows={4}
          />
        </div>

        {/* 비밀번호 */}
        <div className="editModal-section">
          <label className="editModal-label">비밀번호</label>
          <div className="editModal-passwordWrapper">
            <input
              className="editModal-input"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="editModal-eyeButton"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img src={showPassword ? icShow : icHide} alt="toggle password" />
            </button>
          </div>
        </div>

        {/* 버튼 */}
        <div className="editModal-buttonGroup">
          <button className="editModal-cancelButton" onClick={onClose}>
            취소
          </button>
          <button className="editModal-submitButton" onClick={handleSubmit}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}
