import { useState } from "react";
import vectorIcon from "../../assets/ic_delete.svg";
import togglepassword from "../../assets/onpassword.svg";
import toggleoffpassword from "../../assets/offpassword.svg";
import { validateNewInvest } from "../../utils/validation";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const investModal = ({ myCorp, onClose, onInvestSuccess }) => {
  const [passwordVisible, setpasswordVisible] = useState(false);
  const [passwordVisible2, setpasswordVisible2] = useState(false);

  function passwordInput() {
    setpasswordVisible(!passwordVisible);
  }
  function passwordInput2() {
    setpasswordVisible2(!passwordVisible2);
  }

  const [investorName, setInvestorName] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleInvest = function () {
    const error = validateNewInvest({
      name: investorName,
      amount,
      comment,
      password,
      passwordConfirm,
      myCorp,
    });
    if (error) {
      alert(error);
      return;
    }

    const investorData = {
      name: investorName,
      amount: Number(amount),
      password,
      comment,
      corpId: myCorp.id,
      updatedAt: new Date(),
    };

    fetch(`${API_BASE_URL}/investors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(investorData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("서버 저장 실패");
        return res.json();
      })
      .then((data) => {
        console.log("DB 저장 완료:", data);
        onInvestSuccess();
      })
      .catch((err) => alert("등록에 실패했습니다: " + err.message));
  };

  return (
    <div className="modalOverlay">
      <div className="modalContentlarge">
        <div className="largemodalTop">
          <label className="mainTitle">기업에 투자하기</label>
          <img
            src={vectorIcon}
            alt="닫음"
            onClick={onClose}
            style={{ cursor: "pointer", width: "32px", height: "32px" }}
          />
        </div>

        <div className="investInfo">
          <label className="inputLabel">투자 기업 정보</label>
          <div className="infoContainer">
            <img
              src={myCorp?.img}
              alt={myCorp?.name}
              className="corpImgSmall"
            />
            <span className="corpNameText">{myCorp?.name}</span>
            <span className="corpCategoryText">{myCorp?.category}</span>
          </div>
        </div>

        <div className="inputGroup">
          <label className="inputLabel">투자자 이름</label>
          <input
            className="modalInput"
            type="text"
            value={investorName}
            onChange={function (e) {
              setInvestorName(e.target.value);
            }}
            placeholder="투자자 이름을 입력해 주세요"
          />
        </div>

        <div className="inputGroup">
          <label className="inputLabel">투자 금액</label>
          <input
            className="modalInput"
            type="text"
            value={amount}
            onChange={function (e) {
              setAmount(e.target.value.replace(/[^0-9]/g, ""));
            }}
            placeholder="투자 금액을 입력해 주세요"
          />
        </div>

        <div className="inputGroup">
          <label className="inputLabel">투자 코멘트</label>
          <textarea
            className="modalInput2"
            value={comment}
            onChange={function (e) {
              setComment(e.target.value);
            }}
            placeholder="투자 코멘트를 입력해 주세요"
          />
        </div>

        <div className="inputGroup">
          <label className="inputLabel">비밀번호</label>
          <div className="inputContainer">
            <input
              className="modalInput"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={function (e) {
                setPassword(e.target.value);
              }}
              placeholder="비밀번호를 입력해 주세요"
            />
            <img
              className="eyeIcon"
              onClick={passwordInput}
              src={passwordVisible ? togglepassword : toggleoffpassword}
              alt="눈"
            />
          </div>
        </div>

        <div className="inputGroup">
          <label className="inputLabel">비밀번호 확인</label>
          <div className="inputContainer">
            <input
              className="modalInput"
              type={passwordVisible2 ? "text" : "password"}
              value={passwordConfirm}
              onChange={function (e) {
                setPasswordConfirm(e.target.value);
              }}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
            />
            <img
              className="eyeIcon"
              onClick={passwordInput2}
              src={passwordVisible2 ? togglepassword : toggleoffpassword}
              alt="눈"
            />
          </div>
        </div>

        <div className="modalFooter">
          <button className="orangeButton cancel" onClick={onClose}>
            취소
          </button>
          <button className="orangeButton" onClick={handleInvest}>
            투자하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default investModal;
