import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    console.log("Logging in with", username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100 relative">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="src/assets/background_images/loginbg.jpg"
          alt="Bakery Background"
          className="w-full h-full object-cover blur-md opacity-100"
        />
      </div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/40 shadow-2xl rounded-3xl p-10 w-110 relative backdrop-blur-lg border border-pink-300"
      >
        <h2 className="text-3xl font-extrabold text-center text-pink-700 mb-4">
          Welcome Back! 🎂
        </h2>
        <p className="text-center text-gray-600 mb-6">Login to LLOMS</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm bg-pink-50 border-pink-300 opacity-45"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm bg-pink-50 border-pink-300 opacity-45"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Toggle Password Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-pink-600 hover:text-pink-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Login Button */}
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
    </div>
  );
}
