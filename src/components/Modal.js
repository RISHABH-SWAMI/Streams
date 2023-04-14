import React from "react";
import ReactDOM from "react-dom";
// import history from "../history";

const Modal = props => {
  return ReactDOM.createPortal(
    <div
      onClick={props.onDismiss}
      className="ui dimmer modals visible active"
    >
      <div onClick={(event) => event.stopPropagation()} className="ui standard modal visible active">
        <i className="close icon" onClick={props.onDismiss}></i>
        <div className="header">{props.title}</div>
        <div className="content">
          {props.content}
        </div>
        <div className="actions">
          {/* <div className="ui primary button">Delete</div>
          <div className="ui button">Cancel</div> */}
          {props.actions}
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
