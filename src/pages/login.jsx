import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [view, setView] = useState("login");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  // SIGNUP
  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (signupData.password !== signupData.repassword) {
      setError("Passwords do not match");
      return;
    }

    localStorage.setItem("user", JSON.stringify(signupData));
    setSuccess("Account created");

    setSignupData({
      username: "",
      email: "",
      password: "",
      repassword: "",
    });
  };

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No user found");
      return;
    }

    if (
      storedUser.email === loginData.email &&
      storedUser.password === loginData.password
    ) {
      // FIXED: store username for navbar/dashboard
      localStorage.setItem("username", storedUser.username);
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }

    setLoginData({ email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-6 border border-gray-600 rounded-xl w-[320px] bg-gray-800 shadow-lg">
        <h2 className="text-center mb-4 text-xl font-semibold">
          {view === "login" ? "Login" : "Signup"}
        </h2>

        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-400 text-sm mb-2">{success}</p>}

        {/* LOGIN */}
        {view === "login" && (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="w-full mb-3 p-2 rounded-md bg-white text-black placeholder-gray-500 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full mb-3 p-2 rounded-md bg-white text-black placeholder-gray-500 outline-none"
            />

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md mb-2">
              Login
            </button>

            <p
              className="text-sm cursor-pointer text-blue-300 text-center"
              onClick={() => {
                setView("signup");
                setError("");
                setSuccess("");
              }}
            >
              Go to Signup
            </p>
          </form>
        )}

        {/* SIGNUP */}
        {view === "signup" && (
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              required
              value={signupData.username}
              onChange={(e) =>
                setSignupData({ ...signupData, username: e.target.value })
              }
              className="w-full mb-3 p-2 rounded-md bg-white text-black placeholder-gray-500 outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              className="w-full mb-3 p-2 rounded-md bg-white text-black placeholder-gray-500 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              className="w-full mb-3 p-2 rounded-md bg-white text-black placeholder-gray-500 outline-none"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={signupData.repassword}
              onChange={(e) =>
                setSignupData({ ...signupData, repassword: e.target.value })
              }
              className="w-full mb-3 p-2 rounded-md bg-white text-black placeholder-gray-500 outline-none"
            />

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md mb-2">
              Signup
            </button>

            <p
              className="text-sm cursor-pointer text-blue-300 text-center"
              onClick={() => {
                setView("login");
                setError("");
                setSuccess("");
              }}
            >
              Back to Login
            </p>
          </form>
        )}
      </div>
    </div>
  );
}