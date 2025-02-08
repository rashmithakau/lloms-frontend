const CustomButton = ({ text, bgColor, textColor, borderColor, hoverColor }) => {
    return (
      <button
        className={`md:w-[162px] sm:w-[100px] w-[50px] h-[44px] ${bgColor} ${textColor} font-semibold rounded-md border ${borderColor} hover:${hoverColor}`}
      >
        {text}
      </button>
    );
  };
  
  export default CustomButton;