import React, { useState } from "react";
import ic_delete from "../assets/ic_delete.svg";
import icShow from "../assets/onpassword.svg";
import icHide from "../assets/offpassword.svg";
import { useModal } from "../context/ModalContext";

export default function AuthenticationModal({
  isOpen,
  onClose,
  onDelete,
  delInvestor,
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { showResult, showError } = useModal();

  if (!isOpen) return null;

  const handleAuth = async () => {
    if (password) {
      await onDelete(password);
      setPassword("");
      onClose();
    } else {
      showError("비밀번호를 입력해주세요.");
    }
  };

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
            style={{ width: "24px", height: "24px", cursor: "pointer" }}
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
                border: isFocused ? "1.5px solid #EB5230" : "1px solid #747474",
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
                  outline: "none",
                  fontSize: "14px",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <img
                src={showPassword ? icShow : icHide}
                style={{ width: "24px", height: "24px", cursor: "pointer" }}
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
