import React from "react";
import { useNavigate } from "react-router-dom";

const SelectCouncil = () => {
  const navigate = useNavigate();

  return (
    <div className="select-council-page" style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Upcomming Year of Study</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "40px" }}>
        <button
          onClick={() => navigate("/senior")}
          style={{ padding: "15px 30px", fontSize: "18px", cursor: "pointer" }}
        >
          Third Year
        </button>
        <button
          onClick={() => navigate("/junior")}
          style={{ padding: "15px 30px", fontSize: "18px", cursor: "pointer" }}
        >
          Second Year
        </button>
      </div>
    </div>
  );
};

export default SelectCouncil;
