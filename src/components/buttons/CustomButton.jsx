const CustomButton = ({ text, bgColor, textColor, borderColor, hoverColor }) => {
    return (
      <button
        className={`w-[162px] h-[44px] ${bgColor} ${textColor} font-semibold rounded-md border ${borderColor} hover:${hoverColor}`}
      >
        {text}
      </button>
    );
  };
  
  export default CustomButton;