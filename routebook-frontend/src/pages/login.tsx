import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { login } from "../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [signup, setSignup] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const validate = (): boolean => {
    if (!username.trim()) {
      toast.error("Username cannot be empty");
      return false;
    }
    if (!password.trim()) {
      toast.error("Password cannot be empty");
      return false;
    }
    return true;
  };

  const authenticate = async () => {
    const check = validate();
    if (!check) return;
    if (signup) {
      const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (!response.ok) {
        toast.error("Could not Sign up. Try a different username");
      } else {
        const body = await response.json();
        localStorage.setItem("jwtToken", body.message);
        dispatch(login());
        toast.success("Successfully signed up!");
      }
    } else {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (!response.ok) {
        toast.error("Could not log in. Check your username and password");
      } else {
        const body = await response.json();
        localStorage.setItem("jwtToken", body.message);
        dispatch(login());
        toast.success("Successfully logged in!");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="bg-purple-950 p-12 rounded-lg ml-auto mr-auto justify-center">
        <div className="flex flex-row gap-x-6 items-center">
          <img src="/login.jpg" alt="login image" width={300} />
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white">
              {signup ? "Create an account" : "Log In"}
            </span>
            <span className="text-gray-300 mb-6">
              {signup ? "Already have an account? " : "Dont have an account? "}
              <button
                className="underline cursor-pointer"
                onClick={() => setSignup(!signup)}
              >
                {signup ? "Log in" : "Sign up"}
              </button>
            </span>
            <input
              type="text"
              placeholder="Username..."
              className="bg-white p-2 rounded-md mb-6 outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password..."
              className="bg-white p-2 rounded-md mb-6 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-purple-700 hover:bg-purple-600 text-white p-2 rounded-md cursor-pointer"
              onClick={() => authenticate()}
            >
              {signup ? "Create Account" : "Log In"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" hideProgressBar />
    </div>
  );
}
