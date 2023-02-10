import React, { useRef, useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    isOpen && (
      <div
        ref={modalRef}
        style={{
          position: "fixed",
          zIndex: "9999999",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255, 255, 255, 0.9)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onClose}
      >
        <div
          style={{
            background: "transparent",
            borderRadius: "5px",
            width: "70%",
            height: "70%",
            top: "1rem",
            padding: "2rem",
            overflow: "auto",
          }}
        >
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
