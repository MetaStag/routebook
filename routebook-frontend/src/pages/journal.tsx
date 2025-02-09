import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import { useNavigate } from "react-router";

export default function () {
  const [journals, setJournals] = useState<any[]>([]);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const username = useAppSelector((state) => state.auth.username);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
    console.log(username);
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3001/journals/fetch?username=${username}`
      );
      if (response.ok) {
        const data = await response.json();
        setJournals(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col p-8 mx-32">
      <div className="flex flex-row justify-between">
        <span className="text-4xl font-bold">My Journals</span>
        <button className="bg-green-100 p-2 rounded-md cursor-pointer">
          Create Journal
        </button>
      </div>
      <hr className="mt-2 mb-8" />
      <div className="grid grid-cols-3">
        {journals.length > 0 ? (
          journals.map((item, index) => (
            <div
              className="bg-green-100 flex flex-col p-4 rounded-lg cursor-pointer"
              key={index}
              onClick={()=>navigate(`/journal/${item.id}`)}
            >
              <img src="/journal.jpg" alt="Journal image" />
              <span className="text-xl font-bold mt-4">{item.title}</span>
              <span className="text-gray-500 mb-4">with {item.party}</span>
              <span>{item.description}</span>
            </div>
          ))
        ) : (
          <span>No Journals found! Try creating one</span>
        )}
      </div>
    </div>
  );
}
