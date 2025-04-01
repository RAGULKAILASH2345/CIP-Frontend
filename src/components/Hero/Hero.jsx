// Hero.js
import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import { io } from "socket.io-client";

const Hero = () => {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    const fetchInitialThreats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/threats");
        const data = await response.json();
        setThreats(
          data.map((threat) => ({
            frame: `data:image/jpeg;base64,${threat.image}`,
            location: threat.area,
            threatId: threat.id, // Assuming your backend provides an id
          }))
        );
      } catch (error) {
        console.error("Error fetching initial threats:", error);
      }
    };

    fetchInitialThreats();

    const socket = io("http://localhost:5000");
    socket.on("newThreat", (data) => {
      const { frame, area, id } = data; // Assuming backend sends id
      const frameUrl = `data:image/jpeg;base64,${frame}`;
      setThreats((prevThreats) => [
        { frame: frameUrl, location: area, threatId: id },
        ...prevThreats,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center mt-[50px] gap-9">
      {threats.map((threat) => (
        <Card
          key={threat.threatId}
          image={threat.frame}
          location={threat.location}
          threatId={threat.threatId}
        />
      ))}
    </div>
  );
};

export default Hero;