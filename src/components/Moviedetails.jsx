import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removemovie } from '../store/reducers/movieSlice';
import { asyncloadmovie } from '../store/actions/movieActions';
import Loader from './templates/Loader';
import { useNavigate } from 'react-router-dom';
import Horizontalcards from './templates/Horizontalcards';

const MovieDetails = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { info, loading, error } = useSelector((state) => state.movie);

    const [showTrailer, setShowTrailer] = useState(false);

    const backgroundImage = info?.detail?.backdrop_path
        ? `https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`
        : "https://via.placeholder.com/1500x800/000000/FFFFFF?text=No+Image";

    const imageUrl = info?.detail?.backdrop_path
        ? `https://image.tmdb.org/t/p/w500/${info.detail.backdrop_path}`
        : info?.detail?.poster_path
            ? `https://image.tmdb.org/t/p/w500/${info.detail.poster_path}`
            : "https://via.placeholder.com/150";

    useEffect(() => {
        if (!id) return;
        dispatch(asyncloadmovie(id));
        return () => {
            dispatch(removemovie());
        };
    }, [dispatch, id]);

    if (loading) return <Loader />;
    if (error) return <p className='text-red-500 text-center mt-10'>{error}</p>;
    if (!info) return <p className='text-gray-400 text-center mt-10'>No movie details found.</p>;

    return info ? (
        <div className="w-screen h-[150vh] px-[10%] relative">
            {/* Background Image with Opacity Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                }}
            />
            <div className="absolute inset-0 bg-black opacity-50"></div> {/* Opacity layer */}
            
            {/* Content */}
            <div className="relative z-10 text-white">
                <nav className='h-[10vh] items-center w-full text-zinc-300 flex gap-10 text-xl '>
                    <Link
                        onClick={() => navigate(-1)}
                        className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD] transition-colors duration-200 mr-2 text-xl"
                    ></Link>
                    <a target='_blank' href={info?.detail?.homepage || "#"}><i className="ri-earth-fill"></i></a>
                    <a target='_blank' href={info?.externalid?.wikidata_id ? `https://www.wikidata.org/wiki/${info.externalid.wikidata_id}` : "#"}><i className="ri-external-link-fill"></i></a>
                    <a target='_blank' href={info?.externalid?.imdb_id ? `https://www.imdb.com/title/${info.externalid.imdb_id}` : "#"}>IMDB</a>
                </nav>

                <div className="flex items-center">
                    <img
                        className="h-[40vh] object-cover rounded-lg"
                        src={imageUrl}
                        alt={info.name || info.original_name || info.title || info.original_title || "Image"}
                        loading="lazy"
                    />
                    <div className="ml-[5%]">
                        <h1 className="text-5xl font-black text-white mt-3">
                            {info.detail.name || info.detail.original_name || info.detail.title || info.detail.original_title} 
                            <span className='text-lg text-zinc-500'>({info.detail.release_date.split("-")[0]})</span>
                        </h1>
                        <div className='flex text-zinc-100 items-center gap-x-3 mb-5 mt-3'>
                            <span className="rounded-full text-xl font-semibold bg-yellow-500 h-[5vh] w-[5vh] flex justify-center items-center">
                                {(info.detail.vote_average * 10).toFixed()}%
                            </span>
                            <h1 className='w-[60px] font-semibold text-2xl leading-6'>User Score</h1>
                            <h1>{info.detail.release_date}</h1>
                            <h1>{info.detail.genres.map(g => g.name).join(",")}</h1>
                            <h1>{info.detail.runtime} min</h1>
                        </div>
                        <h1 className='text-xl font-semibold italic text-zinc-200'>{info.detail.tagline}</h1>
                        <h1 className='text-2xl mt-5 text-white'>Overview</h1>
                        <p className="text-sm text-wrap">{info.detail.overview}</p>
                        <h1 className='text-2xl mt-5 text-white'>Movie Translated</h1>
                        <p className="text-sm text-wrap">{info.translations.join(", ")}</p>
                        <Link to={`${pathname}/trailer`}>
                            <button className="px-6 py-3 mt-5 bg-[#6556CD] text-white font-semibold rounded-lg hover:bg-red-700 transition">
                                <i className="mr-2 ri-play-fill"></i>Play Trailer
                            </button>
                        </Link>
                    </div>
                </div>

                <h1 className='text-2xl font-semibold text-white mt-5 mb-2'>Recommendations</h1>
                <Horizontalcards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
                <Outlet />
            </div>
        </div>
    ) : <Loader />;
};

export default MovieDetails;
