import React from "react";
import { Link } from "react-router-dom";
import noimage from "/src/assets/noimage.jpg";
 // Ensure correct relative path

const Horizontalcards = ({ data }) => {
  return (
    <div className="w-full h-auto flex overflow-x-auto space-x-3 scrollbar-hide">
      {data.map((d, i) => (
        <div
          key={i}
          className="min-w-[200px] sm:min-w-[150px] md:min-w-[180px] lg:min-w-[15%] h-full bg-zinc-900 p-3 rounded-lg shadow-lg"
        >
          <Link to={`/${d.media_type || "movie"}/details/${d.id}`}>
            <img
              className="w-full h-[250px] object-cover rounded-lg"
              src={d.poster_path && d.poster_path.trim() !== "" ? `https://image.tmdb.org/t/p/w500/${d.poster_path}` : noimage}
              alt={d.name || d.title || d.original_title || d.original_name || "No Image Available"}
              onError={(e) => (e.target.src = noimage)} // Ensure fallback works
            />
          </Link>
          <h1 className="font-bold text-white mt-2 truncate">
            {d.name || d.title || d.original_title || d.original_name}
          </h1>
          <p className="mt-2 text-gray-300 text-sm">
            {d.overview ? `${d.overview.slice(0, 80)}...` : "No description available."}
            <span className="text-blue-400 cursor-pointer"> more</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Horizontalcards;
