import React, { useState, useEffect } from "react";
import "./PopupImage.css";

const PopupImage = ({ image, delay = 1000 }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!open) return null;

  const closePopup = () => setOpen(false);

  return (
    <div className="popup-overlay" onClick={closePopup}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={closePopup}>×</button>

        <img
          src={image}
          alt="Popup Banner"
          className="popup-image"
        />
      </div>
    </div>
  );
};

export default PopupImage;
