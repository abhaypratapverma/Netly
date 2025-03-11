import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../utils/Axios";
import noimage from "../../assets/noimage.jpg";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (query.trim()) {
      GetSearches();
    } else {
      setsearches([]);
    }
  }, [query]);

  return (
    <div className="relative w-full h-[10vh] flex justify-center items-center  text-black shadow">
      {/* Search Icon */}
      <i className="text-3xl text-zinc-400 ri-search-line"></i>

      {/* Search Input */}
      <input
        value={query}
        onChange={(e) => setquery(e.target.value)}
        className="mx-4 w-[50%] p-3 text-white text-xl outline-none rounded-md  border-gray-300   bg-transparent"
        type="text"
        placeholder="Search for a movie..."
      />

      {/* Clear Search Button */}
      {query.length > 0 && (
        <i onClick={() => setquery("")} className="text-3xl text-zinc-400 ri-close-fill cursor-pointer ml-2"></i>
      )}

      {/* Search Results Dropdown */}
      {searches.length > 0 && (
        
        <div className="absolute top-[110%] left-[25%] w-[50%] max-h-[50vh] bg-white shadow-lg overflow-auto rounded-lg z-50">
          {searches.map((s, i) => (
            console.log("Media Type:", s.media_type),
            <Link
              key={i}
              
              to={`${s.media_type}/details/${s.id}`}
              className="flex items-center gap-4 p-3 border-b border-gray-200 hover:bg-gray-100 transition"
            >
              
              <img
                src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/w200/${s.backdrop_path || s.profile_path}` : noimage}
                alt={s.name || "No Image"}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <span className="text-lg text-gray-800">{s.name || s.title || s.original_name || s.original_title}</span>
            </Link>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default Topnav;
