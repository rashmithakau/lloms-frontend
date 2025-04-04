import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.js"; 
import AuthContext from "../context/AuthContext.jsx";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 🔥 New loading state

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true); // 🔥 Show loading

    try {
      const data = await login(username, password);
      if (data?.token) {
        loginUser(data.token);
        const decode = jwtDecode(data.token);
        console.log("token:", decode);

        setTimeout(() => {
          switch (decode.role) {
            case 1:
              navigate("/outlet");
              break;
            case 2:
              navigate("/factory-Staff");
              break;
            case 3:
              navigate("/owner");
              break;
            default:
              navigate("/");
          }
        }, 1000); // 👈 Optional delay for better UX
      } else {
        setLoading(false);
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Login Error:", err?.response || err);
      setError("Invalid username or password.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100 relative">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="src/assets/background_images/loginbg.jpg"
          alt="Bakery Background"
          className="w-full h-full object-cover blur-sm opacity-100"
        />
      </div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/60 shadow-2xl rounded-3xl p-10 w-110 relative backdrop-blur-lg border border-pink-300"
      >
        <h2 className="text-3xl font-extrabold text-center text-pink-700 mb-4">
          Welcome Back! 🎂
        </h2>
        <p className="text-center text-gray-600 mb-6">Login to LLOMS</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 shadow-sm bg-white border-pink-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 shadow-sm bg-white border-pink-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-pink-600 hover:text-pink-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-pink-600 text-white py-3 rounded-lg font-bold shadow-md hover:from-pink-500 hover:to-pink-700 transition"
          >
            Login
          </motion.button>
        </form>
      </motion.div>

      {/* 🔄 Loading Spinner Overlay */}
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center  backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
          />
        </motion.div>
      )}
    </div>
  );
}
