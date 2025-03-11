import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removetv } from "../store/reducers/tvSlice";
import { asyncloadtv } from "../store/actions/tvActions";
import Loader from "./templates/Loader";
import { useNavigate } from "react-router-dom";
import Horizontalcards from "./templates/Horizontalcards";
import noimage from "../assets/noimage.jpg"; // Correct relative path

const Tvdetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.tv);

  useEffect(() => {
    if (!id) return;
    dispatch(asyncloadtv(id));

    return () => {
      dispatch(removetv());
    };
  }, [dispatch, id]);

  console.log("TV Details:", info); // Debugging log

  if (!info) return <p className="text-gray-400 text-center mt-10">No TV details found.</p>;

  const backgroundImage = info?.detail?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`
    : noimage; // Uses fallback image if no backdrop

  const imageUrl = info?.detail?.poster_path
    ? `https://image.tmdb.org/t/p/w500/${info.detail.poster_path}`
    : noimage; // Uses fallback poster image

  return (
    <div className="w-screen h-[200vh] px-[10%] relative">
      {/* Background Image with Proper Cover & Positioning */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100%",
          width: "100%",
        }}
      />
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Opacity layer */}

      {/* Content */}
      <div className="relative z-10 text-white">
        <nav className="h-[10vh] items-center w-full text-zinc-300 flex gap-10 text-xl">
          <Link
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD] transition-colors duration-200 mr-2 text-xl"
          ></Link>
          <a target="_blank" rel="noopener noreferrer" href={info?.detail?.homepage || "#"}>
            <i className="ri-earth-fill"></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={info?.externalid?.wikidata_id ? `https://www.wikidata.org/wiki/${info.externalid.wikidata_id}` : "#"}
          >
            <i className="ri-external-link-fill"></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={info?.externalid?.imdb_id ? `https://www.imdb.com/title/${info.externalid.imdb_id}` : "#"}
          >
            IMDB
          </a>
        </nav>

        <div className="flex items-center">
          <img
            className="h-[40vh] object-cover rounded-lg"
            src={imageUrl}
            alt="TV Show Poster"
            loading="lazy"
          />
          <div className="ml-[5%]">
            <h1 className="text-5xl font-black text-white mt-3">
              {info.detail.name || info.detail.original_name || info.detail.title || info.detail.original_title}
              {info.detail.first_air_date ? (
                <span className="text-lg text-zinc-500"> ({info.detail.first_air_date.split("-")[0]})</span>
              ) : (
                ""
              )}
            </h1>

            <div className="flex text-zinc-100 items-center gap-x-3 mb-5 mt-3">
              <span className="rounded-full text-xl font-semibold bg-yellow-500 h-[5vh] w-[5vh] flex justify-center items-center">
                {info.detail.vote_average ? `${(info.detail.vote_average * 10).toFixed()}%` : "N/A"}
              </span>
              <h1 className="w-[60px] font-semibold text-2xl leading-6">User Score</h1>
              <h1>{info.detail.first_air_date || "N/A"}</h1>
              <h1>{info.detail.genres ? info.detail.genres.map((g) => g.name).join(", ") : "N/A"}</h1>
              <h1>{info.detail.runtime ? `${info.detail.runtime} min` : "N/A"}</h1>
            </div>

            <h1 className="text-xl font-semibold italic text-zinc-200">{info.detail.tagline || "No tagline available"}</h1>
            <h1 className="text-2xl mt-5 text-white">Overview</h1>
            <p className="text-sm text-wrap">{info.detail.overview || "No overview available"}</p>

            <h1 className="text-2xl mt-5 text-white">TV Translations</h1>
            <p className="text-sm text-wrap">{info.translations ? info.translations.join(", ") : "No translations available."}</p>

            <Link to={`${pathname}/trailer`}>
              <button className="px-6 py-3 mt-5 bg-[#6556CD] text-white font-semibold rounded-lg hover:bg-red-700 transition">
                <i className="mr-2 ri-play-fill"></i>Play Trailer
              </button>
            </Link>
          </div>
        </div>

        <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-600" />

        <h1 className="text-2xl font-semibold text-white mt-5 mb-2">Seasons</h1>
        <div className="w-full h-[45vh] overflow-x-auto flex gap-x-5 scrollbar-hide flex-nowrap">
  {info.detail.seasons && info.detail.seasons.length > 0 ? (
    info.detail.seasons.map((s, i) => (
      <div key={i} className="min-w-[200px] h-[40vh] relative">
        <img
          className="h-[30vh] w-[100%] object-cover rounded-lg"
          src={s.poster_path ? `https://image.tmdb.org/t/p/original/${s.poster_path}` : noimage}
          loading="lazy"
          alt={s.name}
        />
        <div className="absolute bottom-2 left-0 w-full bg-opacity-60 text-center py-1">
          <h1 className="text-white text-lg font-semibold">{s.name}</h1>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-400 text-center mt-10">No seasons found.</p>
  )}
</div>


        <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-600" />
        <h1 className="text-2xl font-semibold text-white mt-5 mb-2">Recommendations</h1>
        <Horizontalcards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />

        <Outlet />
      </div>
    </div>
  );
};

export default Tvdetails;
