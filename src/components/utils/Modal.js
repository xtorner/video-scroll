import React, { useRef, useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 300);
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
          zIndex: "9999",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255, 255, 255, 0.9)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: isClosing ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
        onClick={onClose}
      >
        <div
          style={{
            background: "transparent",
            zIndex: "99999",
            borderRadius: "5px",
            width: "70%",
            height: "70%",
            top: "1rem",
            padding: "2rem",
          }}
        >
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
