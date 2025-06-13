import React, { useState, useEffect } from "react";
import {
  auth,
  logout,
  signInWithEmail,
  signUpWithEmail,
} from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "../useMediaQuery";

import PendingArtDisplay from "../components/PendingArtDisplay";
import { onAuthStateChanged } from "firebase/auth";
import AcceptedArtDisplay from "../components/AcceptedArtDisplay";
import { adminCheck } from "../firebase/firestore";

import bgDesktop from "/images/bgDesktopRevisi.webp";
import bgMobile from "/images/bgMobileRevisi.jpg";

const PendingSubsmissionPage = () => {
  const navigate = useNavigate();
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

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
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoadingLogin(true);
    setError("");

    try {
      await signUpWithEmail(formData.email, formData.password);
      navigate("/pending");
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
        adminCheck(setUserEmail, setUserRole, setIsAdmin);
      } else {
        setIsUser(false);
      }
    });
  }, []);

  return (
    <div
      className="w-screen min-h-screen mx-auto p-6 flex flex-col justify-center items-center bg-bottom"
      style={{ backgroundImage: `url(${isMobile ? bgMobile : bgDesktop})` }}
    >
      <div className="w-full max-w-md mb-40">
        {isUser ? (
          <div className="flex flex-col items-center bg-[#ffffff80] rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-black mb-2">Logged In</h1>
            <div className="text-center mb-8 text-black flex flex-col justify-start items-start">
              <p className="">
                uid:{" "}
                <span className="text-gray-600">{auth.currentUser.uid}</span>
              </p>
              <p className="">
                Email: <span className="text-gray-600">{userEmail}</span>
              </p>
              <p className="">
                Role: <span className="text-gray-600">{userRole}</span>
              </p>
            </div>

            <button
              onClick={logout}
              className="w-full py-3 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="bg-[#ffffff80] rounded-lg shadow-xl p-8 pb-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-black mb-2">
                {isLogin ? "Login" : "Sign Up"}
              </h1>
              <p className="text-gray-600">
                {isLogin ? "Login as Admin" : "Create a new account"}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
                {error}
              </div>
            )}

            <form
              onSubmit={isLogin ? handleLogin : handleSignup}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black mb-2"
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
                  className="w-full px-4 py-2 bg-white rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black mb-2"
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
                  className="w-full px-4 py-2 bg-white rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
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
                {isLoadingLogin
                  ? isLogin
                    ? "Logging in..."
                    : "Signing up..."
                  : isLogin
                  ? "Login"
                  : "Sign Up"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="rounded-lg flex flex-col items-center p-8 w-full">
            <h1 className="text-gray-800 text-3xl mb-12">
              - Submission Pending -
            </h1>
            <PendingArtDisplay />
          </div>
          <div className=" rounded-lg flex flex-col items-center p-8 w-full mt-20">
            <h1 className="text-gray-800 text-3xl mt-20 mb-12">
              - Submission Accepted -
            </h1>
            <AcceptedArtDisplay />
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingSubsmissionPage;
