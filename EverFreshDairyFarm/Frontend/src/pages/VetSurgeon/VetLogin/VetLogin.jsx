import React, { useContext, useState } from "react";
import { assets } from "../../../assets/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../../../Content/AppContentvet";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";

function Login() {
  const navigate = useNavigate();
  const { login, id } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [NIC, setNIC] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};

    if (state === "Sign Up") {
      if (!name.trim()) formErrors.name = "Name is required";
      if (!NIC.trim()) formErrors.NIC = "NIC is required";
      if (!workExperience.trim())
        formErrors.workExperience = "Work experience is required";
    }

    if (!email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email is invalid";
    }

    if (!password.trim()) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (state === "Sign Up") {
        // Registration logic
        const { data } = await axios.post(
          "http://localhost:8000/veterinarySurgeon/register",
          {
            name,
            email,
            NIC,
            workExperience,
            password,
          }
        );

        if (data.success) {
          alert("Registration successful! Please login.");
          setState("Login");
          setPassword("");
        } else {
          alert(data.message || "Registration failed. Please try again.");
        }
      } else {
        // Login logic (existing code)
        const { data } = await axios.post(
          "http://localhost:8000/veterinarySurgeon/login",
          {
            email,
            password,
          }
        );

        if (data.success) {
          localStorage.setItem(
            "vettoken",
            JSON.stringify(data.userDetails.token)
          );

          const userInfo = {
            ...data.userDetails,
            name: data.userDetails.name || email.split("@")[0],
          };

          login(userInfo);
          navigate("/Registry");
        } else {
          alert(data.message || "Login failed. Please check your credentials.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div
        className="flex items-center justify-center min-h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${assets.vetlogin_icon})` }}
      >
        <div className="bg-emerald-50 p-10 rounded-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.2)] w-full max-w-[400px] text-gray-200 text-sm text-center">
          <h2 className="mb-1 text-3xl font-semibold text-black">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </h2>
          <p className="mb-5 text-sm text-black">
            {state === "Sign Up"
              ? "Create your account"
              : "Login to your account"}
          </p>

          <form onSubmit={SubmitHandler}>
            {state === "Sign Up" && (
              <>
                <div className="flex flex-col">
                  <div className="flex items-center gap-5 w-full p-2.5 rounded-full bg-teal-700 mb-3">
                    <img className="w-4" src={assets.person_icon} alt="" />
                    <input
                      className="flex-1 text-white bg-transparent border-none outline-none"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      placeholder="Enter the Name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mb-2 text-xs text-left text-red-500">
                      {errors.name}
                    </p>
                  )}

                  <div className="flex items-center gap-5 w-full p-2.5 rounded-full bg-teal-700 mb-3">
                    <img className="w-4" src={assets.NIC_icon} alt="" />
                    <input
                      className="flex-1 text-white bg-transparent border-none outline-none"
                      onChange={(e) => setNIC(e.target.value)}
                      value={NIC}
                      type="text"
                      placeholder="Enter the NIC"
                    />
                  </div>
                  {errors.NIC && (
                    <p className="mb-2 text-xs text-left text-red-500">
                      {errors.NIC}
                    </p>
                  )}

                  <div className="flex items-center gap-5 w-full p-2.5 rounded-full bg-teal-700 mb-3">
                    <img className="w-4" src={assets.person_icon} alt="" />
                    <input
                      className="flex-1 text-white bg-transparent border-none outline-none"
                      onChange={(e) => setWorkExperience(e.target.value)}
                      value={workExperience}
                      type="text"
                      placeholder="Enter Work Experience Duration"
                    />
                  </div>
                  {errors.workExperience && (
                    <p className="mb-1 text-xs text-left text-red-500">
                      {errors.workExperience}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="flex flex-col">
              <div className="flex items-center gap-5 w-full p-2.5 rounded-full bg-teal-700 mb-3">
                <img className="w-4" src={assets.mail_icon} alt="" />
                <input
                  className="flex-1 text-white bg-transparent border-none outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter the Email"
                />
              </div>
              {errors.email && (
                <p className="mb-2 text-xs text-left text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-5 w-full p-2.5 rounded-full bg-teal-700 mb-3">
                <img className="w-3" src={assets.lock_icon} alt="" />
                <input
                  className="flex-1 text-white bg-transparent border-none outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Enter the Password"
                />
              </div>
              {errors.password && (
                <p className="mb-2 text-xs text-left text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="pt-3 pb-3 pr-6 pl-6 mt-2 rounded-full bg-gradient-to-r from-[#24a878] to-[#046848] text-black font-medium border-none cursor-pointer"
            >
              {state}
            </button>
          </form>

          {state === "Sign Up" ? (
            <p className="text-black text-xs mt-3">
              Already have an account?{"    "}
              <span
                className="text-green-600 underline cursor-pointer"
                onClick={() => setState("Login")}
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-black text-xs mt-2.5">
              Don't have an account?{" "}
              <span
                className="text-green-600 underline cursor-pointer"
                onClick={() => setState("Sign Up")}
              >
                Sign up
              </span>
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
