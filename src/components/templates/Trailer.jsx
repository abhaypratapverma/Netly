import React from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const Trailer = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytvideo = useSelector((state) => state[category]?.info?.video);

    return (
        <div className='bg-[rgba(0,0,0,.9)] fixed w-screen h-screen flex items-center justify-center top-0 left-0 z-[100]'>
            {/* Close Button */}
            <Link
                onClick={() => navigate(-1)}
                className="absolute ri-close-fill hover:text-[#6556CD] transition-colors duration-200 text-4xl text-white right-[5%] top-[10%] cursor-pointer"
            ></Link>

            {/* Check if YouTube video is available */}
            {ytvideo?.key ? (
                <ReactPlayer
                    className="max-w-full max-h-full"
                    width="90%"
                    height="80%"
                    controls
                    url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
                />
            ) : (
                <p className="text-white text-xl">No trailer available.</p>
            )}
        </div>
    );
};

export default Trailer;
