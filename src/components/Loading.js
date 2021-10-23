import React from "react";
import "./Loading.css";
const Loading = (props) => (
  <>
    {props.active && (
      <div className="container">
        <div className="dash uno"></div>
        <div className="dash dos"></div>
        <div className="dash tres"></div>
        <div className="dash cuatro"></div>
      </div>
    )}
  </>
);

export default Loading;
