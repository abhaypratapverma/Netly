import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeperson } from "../store/reducers/personSlice";
import { asyncloadperson } from "../store/actions/personActions";
import Loader from "./templates/Loader";
import Horizontalcards from "./templates/Horizontalcards";
import Dropdown from "./templates/Dropdown";

const Persondetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie"); // lowercase for consistency
  const { info, loading, error } = useSelector((state) => state.person);

  useEffect(() => {
    if (!id) return;
    dispatch(asyncloadperson(id));

    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!info?.detail) return <p className="text-gray-400 text-center mt-10">No person details found.</p>;

  const backgroundImage = info.detail?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`
    : "https://via.placeholder.com/1500x800/000000/FFFFFF?text=No+Image";

  const imageUrl = info.detail?.profile_path
    ? `https://image.tmdb.org/t/p/w500/${info.detail.profile_path}`
    : info.detail?.poster_path
    ? `https://image.tmdb.org/t/p/w500/${info.detail.poster_path}`
    : "https://via.placeholder.com/150";

  return (
    <div className="px-[10%] w-screen bg-[#1F1E24] h-[220vh]">
      {/* Navigation */}
      <nav className="h-[10vh] flex items-center text-zinc-300 gap-10 text-xl">
        <button
          onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
          className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD] transition duration-200 text-xl"
          aria-label="Go Back"
        />
      </nav>

      {/* Content */}
      <div className="w-full flex">
        {/* Left Section */}
        <div className="w-[20%]">
          <img
            className="h-[40vh] object-cover rounded-lg"
            src={imageUrl}
            alt={info.detail?.name || "Person Image"}
            loading="lazy"
          />
          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-600" />

          {/* Social Media Links */}
          <div className="text-2xl flex gap-x-5">
            {info?.externalid && (
              <>
                {info.externalid.wikidata_id && (
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
                    <i className="ri-external-link-fill"></i>
                  </a>
                )}
                {info.externalid.facebook_id && (
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
                    <i className="ri-facebook-circle-fill"></i>
                  </a>
                )}
                {info.externalid.instagram_id && (
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.instagram.com/${info.externalid.instagram_id}`}>
                    <i className="ri-instagram-fill"></i>
                  </a>
                )}
                {info.externalid.twitter_id && (
                  <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/${info.externalid.twitter_id}`}>
                    <i className="ri-twitter-x-fill"></i>
                  </a>
                )}
              </>
            )}
          </div>

          {/* Personal Info */}
          <h1 className="text-2xl text-zinc-400 font-semibold mt-5">Person Info</h1>
          <h1 className="text-lg text-zinc-200 font-semibold">Known for</h1>
          <p className="text-zinc-400">{info.detail?.known_for_department || "N/A"}</p>

          <h1 className="text-lg text-zinc-200 font-semibold">Gender</h1>
          <p className="text-zinc-400">{info.detail?.gender === 1 ? "Female" : info.detail?.gender === 2 ? "Male" : "Other"}</p>

          <h1 className="text-lg text-zinc-200 font-semibold">Birthday</h1>
          <p className="text-zinc-400">{info.detail?.birthday || "N/A"}</p>

          <h1 className="text-lg text-zinc-200 font-semibold">Place of Birth</h1>
          <p className="text-zinc-400">{info.detail?.place_of_birth || "N/A"}</p>

          <h1 className="text-lg text-zinc-200 font-semibold">Also Known as</h1>
          <p className="text-zinc-400">{info.detail?.also_known_as?.join(", ") || "N/A"}</p>
        </div>

        {/* Right Section */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-6xl text-zinc-400 font-black my-5">{info.detail?.name || "N/A"}</h1>
          <h1 className="text-lg text-zinc-200 font-semibold">Biography</h1>
          <p className="text-zinc-400 mt-2">{info.detail?.biography || "No biography available."}</p>

          <h1 className="text-lg text-zinc-200 font-semibold mt-5">Known For</h1>
          <Horizontalcards data={info.combined_credits?.cast || []} />

          <div className="w-full flex justify-between">
            <h1 className="text-xl text-zinc-400 font-semibold mt-5">Acting</h1>
            <Dropdown
              title="Category"
              options={["TV", "Movie"]}
              selectedValue={category}
              func={(selectedValue) => setCategory(selectedValue.toLowerCase())}
            />
          </div>

          {/* Filmography */}
          <div className="w-full h-[50vh] overflow-y-auto shadow-xl shadow-white mt-5 border-zinc-400 p-5 list-disc">
            {info[category === "movie" ? "movie_credits" : "tv_credits"]?.cast?.length > 0 ? (
              info[category === "movie" ? "movie_credits" : "tv_credits"].cast.map((c, i) => (
                <li key={i} className="hover:bg-black text-white duration-300 cursor-pointer p-5 rounded-md">
                  <Link to={`/${category}/details/${c.id}`}>
                    <span>{c.title || c.name || "Unknown Title"}</span>
                    <span className="block ml-5">Character: {c.character || "Unknown Role"}</span>
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-zinc-400">No credits available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Persondetails;
