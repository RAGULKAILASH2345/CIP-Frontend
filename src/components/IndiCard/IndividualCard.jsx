import { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const IndividualCard = () => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { threatId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFrame = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/details", {
          params: { threatId }, 
        });
        const { frame, area, location } = response.data;
        const [lng, lat] = location.replace("POINT(", "").replace(")", "").split(" ");
        setDetails({
          frame: `data:image/jpeg;base64,${frame}`,
          area,
          location: { lat, lng },
        });
      } catch (error) {
        console.error("Error fetching details:", error);
        setError("Failed to fetch details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFrame();
  }, [threatId]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-sm rounded-t-lg m-[25px] md:m-auto relative">
        <button
          onClick={handleBack}
          className="absolute top-2 left-2 text-gray-600 hover:text-gray-800"
        >
          ← Back
        </button>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : details ? (
          <>
            <img
              src={details.frame}
              alt="CCTV Footage"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="flex-col justify-between items-center w-full max-w-3xl mx-auto">
              <div className="bg-gray-100 p-4 rounded-lg mt-3 text-sm text-gray-700 shadow-md w-full">
                <div className="flex justify-between py-1">
                  <span>📍<strong>Area</strong>:</span>
                  <span>{details.area}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>📍<strong>Location</strong>:</span>
                  <span>Lat: {details.location.lat}, Lng: {details.location.lng}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center">No details available</p>
        )}

        {error && <p className="text-center text-sm text-red-600">{error}</p>}
      </Card>
    </div>
  );
};

export default IndividualCard;