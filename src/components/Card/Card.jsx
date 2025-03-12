import React from "react";

const Card = ({ image, location }) => {
  return (
    <div className="relative w-80 bg-white bg-[url('https://www.transparenttextures.com/patterns/checkered-pattern.png')] rounded-2xl overflow-hidden shadow-lg p-4">
      <div className="w-full h-48 flex justify-center items-center bg-black rounded-lg overflow-hidden">
        <img src={image} alt="Game Cover" className="h-full object-cover" />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-[#346c9b] text-xl font-bold">THREAT</h2>
        <p className="text-[#74acec] text-lg">Has been Detected</p>
        <span className="block bg-[#75d406] text-white text-sm font-bold px-3 py-1 mt-2 rounded-md">{location}</span>
        <button className="w-full bg-[#75d406] text-white font-bold py-2 mt-3 rounded-lg hover:bg-[#10d406e6] transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;