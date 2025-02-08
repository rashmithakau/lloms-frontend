import closeIcon from ".../assets/icons/closeButton.png";

const CloseButton = ({ onClick }) => {
    return (
      <button onClick={onClick}>
        <img src={closeIcon} alt="Close" className="w-6 h-6" />
      </button>
    );
  };
  
  export default CloseButton;