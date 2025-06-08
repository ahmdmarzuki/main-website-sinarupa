import React, { useState, useEffect } from "react";
import { auth, logout, signInWithEmail } from "../firebase/auth";

import PendingArtDisplay from "../components/PendingArtDisplay";
import { onAuthStateChanged } from "firebase/auth";
import AcceptedArtDisplay from "../components/AcceptedArtDisplay";

const PendingSubsmissionPage = () => {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isUser, setIsUser] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoadingLogin(true);
    setError("");

    try {
      await signInWithEmail(formData.email, formData.password);
      //   navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoadingLogin(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    });
  }, []);

  return (
    <div className="bg-gray-900 w-screen min-h-screen mx-auto p-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-md mb-40">
        {isUser ? (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Logged In</h1>
              <p className="text-gray-400">UID: {auth.currentUser.uid}</p>
            </div>

            <button
              onClick={logout}
              className="w-full py-3 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium 
                "
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg shadow-xl p-8 pb-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
              <p className="text-gray-400">Login as Admin</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoadingLogin}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                  isLoadingLogin
                    ? "bg-blue-700 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoadingLogin ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-500 hover:text-blue-400 font-medium"
              >
                Sign up
              </button>
            </p>
          </div> */}
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-white text-3xl mt-20 mb-12">
            - Submission Pending -
          </h1>
          <PendingArtDisplay />
          <h1 className="text-white text-3xl mt-20 mb-12">
            - Submission Accepted -
          </h1>
          <AcceptedArtDisplay />
        </div>
      )}
    </div>
  );
};

export default PendingSubsmissionPage;
