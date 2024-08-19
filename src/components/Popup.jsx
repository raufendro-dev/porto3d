import React from 'react';
import '../css/Popup.css'; // Ensure you have this CSS file for styling

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Popup;
