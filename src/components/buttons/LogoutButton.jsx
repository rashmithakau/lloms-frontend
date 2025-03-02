import { motion } from "framer-motion";

const LogoutButton = ({ children, onClick }) => {
  return (
    <div>
      <motion.button
        onClick={onClick}
        className="btn btn-outline btn-secondary w-80 h-10 hover:bg-pink-500 text-pink-800 rounded-md shadow-md hover:text-white outline-2 outline-pink-300"
        whileHover={{ scale: 1.05 }} // Hover scale effect
        whileTap={{ scale: 0.95 }} // Click press effect
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.button>
    </div>
  );
};

export default LogoutButton;
