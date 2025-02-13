const CustomButton = ({ text, bgColor, textColor, borderColor, hoverColor }) => {
  return (
    <button
      className={`md:w-[90px] sm:w-[75px] w-[25px] h-[44px] ${bgColor} ${textColor} font-semibold rounded-md border ${borderColor} hover:${hoverColor}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
