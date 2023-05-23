import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  const btnStyles = {
    borderRadius: "7px",
    height: "2.5rem",
    width: "5rem",
    margin: 0,
    color: "white",
    backgroundColor: "black",
    cursor: "pointer",
  }


  return (
    <button 
    style={{
      ...btnStyles
    }}
    onClick={onClick}>{buttonText}</button>
  );
}

export default OpenModalButton;