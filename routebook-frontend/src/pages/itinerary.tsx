import { useEffect } from "react";
import { Outlet } from "react-router";
import { useAppSelector } from "../hooks";
import { useNavigate } from "react-router";

export default function Itinerary() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, []);
  
  return (
    <div>
      <Outlet />
    </div>
  );
}
