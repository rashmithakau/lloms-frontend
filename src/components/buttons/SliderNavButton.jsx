const SliderNavButton = ({ children, onClick, icon }) => {
    return (
      <div>
        <div
          className="bg-pink-50 hover:bg-gradient-to-r from-pink-500 to-pink-50 
          hover:text-white text-center flex items-center justify-center gap-2 
          rounded-md w-80 h-10 p-2 cursor-pointer hover:scale-105 text-pink-300 
          transition-all duration-200"
          onClick={onClick}
        >
          {icon && (
            <img
              src={icon}
              alt="icon"
              className="w-6 h-6" // Ensure consistent size for the icon
            />
          )}
          <span className="text-sm font-medium">{children}</span>
        </div>
      </div>
    );
  };
  
  export default SliderNavButton;
  