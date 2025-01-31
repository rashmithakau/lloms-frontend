import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    console.log("Logging in with", email, password);
    setError("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100 relative">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="src/assets/background_images/loginbg.jpg"
          alt="Bakery Background"
          className="w-full h-full object-cover blur-sm" // Apply blur here
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/40 shadow-2xl rounded-3xl p-10 w-120 relative backdrop-blur-md border border-pink-300"
      >
        <h2 className="text-3xl font-extrabold text-center text-pink-700 mb-6">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Login to LLOMS
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-pink-600"
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
        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-pink-600 font-bold hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
