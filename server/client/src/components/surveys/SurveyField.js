import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label style={{ fontWeight: "bold" }}>{label}</label>
      <input {...input} style={{ marginBottom: "5px", color: "purple" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
