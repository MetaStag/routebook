import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { login, logout } from "./features/auth/authSlice";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

export default function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp) {
        console.log(decodedToken.exp);
        let isExpired = decodedToken.exp < Date.now() / 1000;
        if (isExpired) dispatch(logout());
        else dispatch(login());
      }
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <div className="grid grid-cols-7 m-8 gap-8">
      <div className="col-span-4 h-full content-center">
        <span className="text-4xl font-extrabold">
          Routebook is the one-stop solution to your journalling and itinerary
          planning needs
        </span>
      </div>
      <img className="col-span-3" src="/home1.jpg" alt="Home image" />
      <div className="bg-yellow-100 flex flex-col p-4 rounded-xl col-span-2">
        <span className="text-3xl font-bold">What do we offer?</span>
        <span className="text-xl">
          We offer a streamlined process to manage your travel journals and
          itineraries, to make sure you always have what you need and make the
          most out of your travel journies
        </span>
      </div>
      <img
        className="col-span-3"
        src="/home2.jpg"
        alt="Home image"
        width={520}
      />
      <div className="flex flex-col col-span-2 gap-y-6">
        <img className="col-span-2" src="/home3.jpg" alt="Home image" />
        <button
          className="bg-yellow-500 p-4 rounded-md cursor-pointer text-xl"
          onClick={() => navigate("/dashboard")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
