import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

function SelectCouncil() {
  const navigate = useNavigate();

  const handleSelect = (council) => {
    navigate(`/form/${council}`);
  };

  return (
    <div className="council-container">
      <div className="glass-card animate">
        <h2 className="title">Select Your Council</h2>
        <div className="council-buttons">
          <button className="council-btn senior" onClick={() => handleSelect("senior")}>
            Senior Council
          </button>
          <button className="council-btn junior" onClick={() => handleSelect("junior")}>
            Junior Council
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectCouncil;
