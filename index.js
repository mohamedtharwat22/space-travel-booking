import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/trips").then((res) => {
      setTrips(res.data);
    });
  }, []);

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-4xl font-bold mb-6">🚀 Space Travel Booking</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-gray-800 p-5 rounded-lg">
            <h2 className="text-2xl">{trip.destination}</h2>
            <p>Departure: {new Date(trip.departure_date).toDateString()}</p>
            <p>Price: ${trip.price}</p>
            <button className="mt-3 bg-blue-500 px-4 py-2 rounded">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
