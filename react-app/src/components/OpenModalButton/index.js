import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  const btnStyles = {
    borderRadius: "7px",
    height: "2.7rem",
    width: "5.5rem",
    margin: 0,
    color: "white",
    backgroundColor: "black",
    cursor: "pointer",
    opacity: 1,
    border: "1px solid #fee52e"
  };

  const handleMouseEnter = (e) => {
    e.target.style.color = "#f2eadf";
    e.target.style["box-shadow"] = "2px 2px 2px hsl(120, 64%, 17%)";
    e.target.style["height"] = "3.5rem";
    e.target.style["width"] = "5.3rem";
    e.target.style["opacity"] = 0.8;
  };
  const handleMouseLeave = (e) => {
    e.target.style.color = "#d2b811";
    e.target.style.border = "1px solid #fee52e";
    e.target.style["box-shadow"] = "";
    e.target.style["height"] = "2.7rem";
    e.target.style["width"] = "5.5rem";
    e.target.style["opacity"] = 1;
  };

  return (
    <button
      style={{
        ...btnStyles,
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {buttonText}
    </button>
  );
}

export default OpenModalButton;
