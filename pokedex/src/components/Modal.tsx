interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          minWidth: "300px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose} style={{ marginTop: "15px" }}>
          Close
        </button>
      </div>
    </div>
  );
}
