import React, { useEffect } from "react";

function Modal(props) {
  if (!props.show) {
    return null;
  }

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{props.title}</h2>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={props.onClose}>Exit</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;