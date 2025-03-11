import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap justify-center w-full h-full mt-5 px-[5%] bg-[#1E1E1E]">
      {data.map((c, i) => {
        const imageUrl = c.profile_path
          ? `https://image.tmdb.org/t/p/w500/${c.profile_path}` // For people
          : c.poster_path
          ? `https://image.tmdb.org/t/p/w500/${c.poster_path}` // For movies/TV
          : c.backdrop_path
          ? `https://image.tmdb.org/t/p/w500/${c.backdrop_path}`
          : "https://via.placeholder.com/150"; // Default placeholder

        return (
          <Link
            to={`/${c.media_type || title}/details/${c.id}`} // ✅ Fixed here (no colon)
            className="relative w-[25vh] mr-[5%] mb-[5%] shadow-lg hover:scale-105 transition-transform duration-300"
            key={i}
          >
            <img
              className="h-[40vh] object-cover rounded-lg"
              src={imageUrl}
              alt={c.name || c.original_name || c.title || c.original_title || "Image"}
              loading="lazy"
            />

            <div className="text-center mt-2 font-semibold">
              <h1 className="text-2xl text-zinc-400 mt-3">
                {c.name || c.original_name || c.title || c.original_title}
              </h1>
            </div>

            {c.vote_average && (
              <div className="absolute top-2 right-2 rounded-full text-lg font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">
                {Math.round(c.vote_average * 10)}
                <sup>%</sup>
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default Cards;
