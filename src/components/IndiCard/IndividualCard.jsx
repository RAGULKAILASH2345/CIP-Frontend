import { useState } from "react";
import { Card } from "flowbite-react";
import axios from "axios";

const IndividualCard = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [station, setStation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [stationError, setStationError] = useState(null);
  const [loadingStation, setLoadingStation] = useState(false);

  const handleGetLocation = () => {
    setLocationError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoordinates({ lat, lng });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError("Unable to retrieve your location.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  };

  const handleGetNearestStation = async () => {
    setStationError(null);
    setStation(null);
    if (!coordinates) {
      setStationError("Please get your current location first.");
      return;
    }

    setLoadingStation(true);
    try {
      const response = await axios.get("http://localhost:5000/api/nearest-station", {
        params: {
          lat: coordinates.lat,
          lng: coordinates.lng,
        },
      });
      const [lat, lng] = response.data.location.replace("POINT(", "").replace(")", "").split(" ");
setStation({ ...response.data, location: { lat, lng } });
    } catch (error) {
      console.error("Error fetching nearest station:", error);
      setStationError("Failed to fetch nearest police station.");
    } finally {
      setLoadingStation(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <Card className="max-w-sm rounded-t-lg" imgAlt="CCTV Footage" imgSrc="./images/CCTVFight4.png">
          <div className="flex-col justify-between items-center w-full max-w-3xl mx-auto">
            <div className="flex m-2 items-center justify-center">
              <button
                onClick={handleGetLocation}
                className="rounded-lg bg-yellow-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-800 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
              >
                Get Location
              </button>
            </div>

            {coordinates && (
              <div className="text-center text-sm text-gray-700">
                📍 <strong>Latitude:</strong> {coordinates.lat} <br />
                📍 <strong>Longitude:</strong> {coordinates.lng}
              </div>
            )}
            {locationError && (
              <p className="text-center text-sm text-red-600">{locationError}</p>
            )}

            <div className="flex m-2 items-center justify-center">
              <button
                onClick={handleGetNearestStation}
                className="rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Get Nearest Police Station Details
              </button>
            </div>

            {loadingStation && (
              <p className="text-center text-sm text-gray-500">Fetching nearest station...</p>
            )}

            {station && (
              <div className="bg-gray-100 p-4 rounded-lg mt-3 text-sm text-gray-700 shadow-md w-full">
              <div className="flex justify-between py-1">
                <span>📍<strong>Area</strong>:</span>
                <span>{station.area}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>📍<strong>Location</strong>:</span>
                <span>Lat: {station.location.lat}, Lng: {station.location.lng}</span>

              </div>
              <div className="flex justify-between py-1">
                <span>📍<strong>Incharge</strong>:</span>
                <span>{station.incharge}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>📍<strong>Phone No</strong>:</span>
                <span>{station.phone_no}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>📍<strong>Station No</strong>:</span>
                <span>{station.station_no}</span>
              </div>
            </div>
            
            )}
            {stationError && (
              <p className="text-center text-sm text-red-600">{stationError}</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IndividualCard;
