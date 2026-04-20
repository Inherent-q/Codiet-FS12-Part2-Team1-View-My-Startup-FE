import { createContext, useContext, useState, useCallback } from "react";
import AlertModal from "../components/AlertModal";

/**
 * 전역 모달 상태를 관리하기 위한 Context
 * - AlertModal을 통해 성공/실패 모달 통합 관리
 */
const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const showResult = useCallback((message, onConfirm) => {
    setModal({ type: "result", message, onConfirm });
  }, []);

  const showError = useCallback((message) => {
    setModal({ type: "error", message });
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

  return (
    <ModalContext.Provider value={{ showResult, showError }}>
      {children}

      {modal && (
        <AlertModal
          isOpen={true}
          message={modal.message}
          onConfirm={() => {
            modal.onConfirm?.();
            closeModal();
          }}
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
