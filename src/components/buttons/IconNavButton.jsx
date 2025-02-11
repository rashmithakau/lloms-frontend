import { motion } from "framer-motion";

const IconNavButton = ({ children, onClick, icon ,isSliderBtn=false}) => {
  const ml=isSliderBtn ? "ml-[100px]" : "";
  const alignment=isSliderBtn ? "":"justify-center";

  return (
   
      <motion.div
        className={`bg-pink-50 hover:bg-gradient-to-r from-pink-500 to-pink-50 hover:text-white text-center flex ${alignment} gap-2 rounded-md w-80 h-10 p-2 cursor-pointer hover:scale-103 text-pink-500 transition-all duration-200`}
        onClick={onClick}
        whileHover={{ scale: 1.1 }} // Hover scale effect
        whileTap={{ scale: 0.98 }} // Press effect on click
        transition={{ duration: 0.2 }}
      >
        <div className="flex gap-2">
          {icon && (
            <img
              src={icon}
              alt="icon"
              className={`w-6 h-6 ${ml}`} // Ensure consistent size for the icon
            />
          )}
          <span className="text-sm font-medium">{children}</span>
        </div>
      </motion.div>
  
  );
};

export default IconNavButton;
