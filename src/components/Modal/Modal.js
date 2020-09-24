import React, {forwardRef, useImperativeHandle} from "react"
import ReactDOM from "react-dom"

const Modal = forwardRef((props,ref) => {
  const [display, setDisplay] = React.useState(true);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      close: () => close()
    }
  });

  const open = () => {
    setDisplay(true)
  };

  const close = () => {
    setDisplay(false);
  };

  if (display) {
    return ReactDOM.createPortal(
      <div className={"modalWrapper"}>
        <div onClick={close} className={"modalBackdrop"} />
        <div className={"modalBox"}>
          {props.children}
        </div>
      </div>, document.getElementById("modal-root"))
  }

  return null;

});

export default Modal