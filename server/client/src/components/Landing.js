import React from "react";
import landing_pic from "../assets//landing.gif";
export const Landing = () => {
  return (
    <div
      style={{
        color: "white",
        textAlign: "center",
        backgroundImage: `url(${landing_pic})`,
        height: "92vh",
        marginTop: "-40px",
      }}
    >
      <h1>Email Survey System</h1>
      Votes Gathering Application
      <br></br>
    </div>
  );
};

export default Landing;
