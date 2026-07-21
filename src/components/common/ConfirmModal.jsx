import { useEffect, useRef, useState } from "react";

function ConfirmModal({
  isOpen,
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const confirmButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    confirmButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSubmitting) {
        onCancel?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onCancel]);

  const handleConfirm = async () => {
    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onConfirm?.();
    } catch (error) {
      console.error("확인 작업 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onCancel?.();
        }
      }}
    >
      <div
        className="confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
      >
        <h2 id="confirm-modal-title">{title}</h2>
        <p id="confirm-modal-description">{description}</p>

        <div className="confirm-modal-actions">
          <button
            className="button outline"
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            {cancelText}
          </button>

          <button
            ref={confirmButtonRef}
            className="button critical"
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "삭제 중..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
