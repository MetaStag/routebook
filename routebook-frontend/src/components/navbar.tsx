import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../features/auth/authSlice";
import { useNavigate, NavLink } from "react-router";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    dispatch(logout());
    return navigate("/");
  };

  return (
    <div className="text-blue-900 flex flex-row justify-between p-2 items-center mb-8">
      <button className="cursor-pointer" onClick={() => navigate("/")}>
        Routebook
      </button>
      <div className="flex flex-row gap-x-4">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/journal">Journal</NavLink>
        <NavLink to="/itinerary">Itinerary</NavLink>
      </div>
      {isLoggedIn ? (
        <button
          className="bg-blue-950 hover:bg-blue-900 text-white p-2 rounded-md cursor-pointer"
          onClick={() => handleLogout()}
        >
          Log Out
        </button>
      ) : (
        <button
          className="bg-blue-950 hover:bg-blue-900 text-white p-2 rounded-md cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
      )}
    </div>
  );
}
