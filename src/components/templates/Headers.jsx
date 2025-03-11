import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { useLocation } from "react-router-dom";
const Headers = ({ data }) => {
  document.title = "Netly | Home";
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { info, loading, error } = useSelector((state) => state.movie);
  const backgroundImage = data?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
    : "https://via.placeholder.com/1500x800?text=No+Image";

  return (
    <div
      className="relative w-full h-[60vh] flex items-center justify-start p-6 text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 0, 0, 0.9)", // Adds a dark overlay without using linear-gradient
      }}
    >

      {/* Overlay Content */}
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {data?.title || data?.name || "No Title Available"}
        </h1>
        <p className="text-md md:text-lg text-gray-300 mb-6 line-clamp-3">
          {data?.overview || "No description available."}
        </p>

        {/* Buttons */}
        <div className="flex space-x-4 items-center">
        <Link to={`/movie/details/${data.id}/trailer`}>
  <button className="px-6 py-3 mt-5 bg-[#6556CD] text-white font-semibold rounded-lg hover:bg-red-700 transition">
    <i className="mr-2 ri-play-fill"></i> Watch Trailer
  </button>
</Link>


          <Link to={`${data.media_type}/details/${data.id}`}><button className="px-6 py-3 mt-5 bg-[#4e9b3f] text-white font-semibold rounded-lg hover:bg-red-700 transition">
            More Info
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default Headers;
