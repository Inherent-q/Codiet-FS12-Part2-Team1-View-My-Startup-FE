import { createContext, useContext, useState } from "react";
import ResultModal from "../components/ResultModal";
import ErrorModal from "../components/ErrorModal";

/**
 * 전역 모달 상태를 관리하기 위한 Context
 * - Result(성공/확인) 모달과 Error(실패) 모달을 통합 관리
 */
const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const showResult = (message, onConfirm) => {
    setModal({ type: "result", message, onConfirm });
  };

  const showError = (message) => {
    setModal({ type: "error", message });
  };

  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ showResult, showError }}>
      {children}

      {/* 제출/수정/삭제 성공 모달 */}
      {modal?.type === "result" && (
        <ResultModal
          isOpen={true}
          message={modal.message}
          onConfirm={() => {
            modal.onConfirm?.();
            closeModal();
          }}
          onClose={closeModal}
        />
      )}
      {/* 제출/수정/삭제 실패 모달 */}
      {modal?.type === "error" && (
        <ErrorModal
          isOpen={true}
          message={modal.message}
          onClose={closeModal}
        />
      )}
    </ModalContext.Provider>
  );
}

/**
 * 전역 모달을 사용하기 위한 커스텀 훅
 *
 * @returns {{
 *   showResult: (message: string, onConfirm?: () => void) => void,
 *   showError: (message: string) => void
 * }}
 *
 * @example
 * const { showResult, showError } = useModal();
 *
 * const handleAuth = () => {
 *   if (isValidPassword) {
 *     showResult("삭제됩니다.", () => {
 *       onDelete();
 *       onClose();
 *     });
 *   } else {
 *     showError("잘못된 비밀번호입니다.");
 *   }
 * };
 */
export function useModal() {
  return useContext(ModalContext);
}
