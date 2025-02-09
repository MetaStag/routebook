import { useState } from "react";

export default function CreateItinerary() {
  const [destination, setDestination] = useState("");
  const [activity, setActivity] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);

  const addDestination = () => {
    if (!destination.trim()) return;
    setDestinations([...destinations, destination]);
  };

  const deleteDestination = (name: string) => {
    setDestinations(destinations.filter((item) => item !== name));
  };

  const addActivity = () => {
    if (!activity.trim()) return;
    setActivities([...activities, activity]);
  };

  const deleteActivity = (name: string) => {
    setActivities(activities.filter((item) => item !== name));
  };

  return (
    <div className="flex flex-col my-8 mx-16">
      <span className="text-4xl font-bold mb-8">Plan your trip</span>
      <div className="grid grid-cols-3 gap-x-8">
        <div className="flex flex-col border-2 rounded-md p-4">
          <span className="text-xl font-bold mb-8">Add destinations</span>
          <input
            type="text"
            value={destination}
            placeholder="Enter destination..."
            className="bg-white p-2 rounded-md mb-6 outline-none"
            onChange={(e) => setDestination(e.target.value)}
          />
          <button
            className="bg-green-100 p-2 rounded-md cursor-pointer"
            onClick={() => {
              addDestination();
              setDestination("");
            }}
          >
            Add destination
          </button>
        </div>
        <div className="flex flex-col border-2 rounded-md p-4">
          <span className="text-xl font-bold mb-8">Activities</span>
          <input
            type="text"
            value={activity}
            placeholder="Add an activity..."
            className="bg-white p-2 rounded-md mb-6 outline-none"
            onChange={(e) => setActivity(e.target.value)}
          />
          <button
            className="bg-green-100 p-2 rounded-md cursor-pointer"
            onClick={() => {
              addActivity();
              setActivity("");
            }}
          >
            Add Activity
          </button>
        </div>
        <div className="flex flex-col rounded-md border-2 p-2">
          <span className="text-xl font-bold">Map</span>
        </div>
      </div>
      <hr className="my-8" />
      <div className="flex flex-row justify-between items-center">
        <span className="text-2xl font-bold my-8">Itinerary Overview</span>
        <button className="bg-green-100 p-2 rounded-md cursor-pointer w-sm h-12">
          Save Itinerary
        </button>
      </div>
      <div className="grid grid-cols-2 mb-8 mx-16 gap-x-16">
        <div className="flex flex-col gap-y-2">
          <span className="text-xl font-bold mb-2">Destinations</span>
          {destinations.map((item, index) => (
            <div className="flex flex-row justify-between">
              <span key={index}>{item}</span>
              <button
                className="cursor-pointer"
                onClick={() => deleteDestination(item)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-xl font-bold mb-2">Activities</span>
          {activities.map((item, index) => (
            <div className="flex flex-row justify-between">
              <span key={index}>{item}</span>
              <button
                className="cursor-pointer"
                onClick={() => deleteActivity(item)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <hr className="mt-2" />
    </div>
  );
}
