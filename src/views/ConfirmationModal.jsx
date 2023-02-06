import React, { useState } from "react";
import "./ConfirmationModal.css";

function ConfirmationModal({ isOpen, onClose, message }) {
  return (
    <div className={`confirmation-modal ${isOpen ? "show" : "hide"}`}>
      <div className="confirmation-modal-content">
        <div className="confirmation-message">
          <i
            className="fas fa-check-circle fa-2x"
            style={{ color: "green" }}
          ></i>
          <p>{message}</p>
        </div>
        <button className="confirmation-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
