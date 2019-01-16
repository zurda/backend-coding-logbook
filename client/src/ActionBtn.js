import React from "react";
import "./ActionBtn.css";

const ActionBtn = props => {
  return (
    <div className="action-btn">
      <button className={props.name} onClick={e => props.click(e)}>
        {props.text}
      </button>
    </div>
  );
};

export default ActionBtn;
