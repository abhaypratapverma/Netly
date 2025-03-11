import { Link } from 'react-router-dom'

import { useEffect } from 'react';
const Sidenav = () => {
  
    return (
        <>
            <div className="w-[20%] h-full  border-r-2 border-zinc-400 p-10">
                <h1 className="text-white text-2xl font-bold">
                    <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
                    <span className="">Netly</span>
                </h1>
                <nav className='flex flex-col gap-3 text-zinc-400 text-xl  '>
                    <h1 className="text-white font-semibold text-xl mt-10 mb-5">New Feeds</h1>
                    <Link to="/trending" className='hover:bg-[#6556CD] p-3 hover:text-white rounded-md duration-300'><i className="mr-2 ri-fire-fill"></i>Trending</Link>
                    <Link to="/popular" className='hover:bg-[#6556CD] p-3 hover:text-white rounded-md duration-300'><i className="mr-2 ri-bard-fill"></i>Popular</Link>
                    <Link to="/movie" className='hover:bg-[#6556CD] p-3 hover:text-white rounded-md duration-300'><i className="mr-2 ri-movie-2-fill"></i>Movies</Link>
                    <Link to="/tv" className='hover:bg-[#6556CD] p-3 hover:text-white rounded-md duration-300'> <i className="mr-2 ri-tv-2-fill"></i>Tv shows</Link>
                    <Link to="/person" className='hover:bg-[#6556CD] p-3 hover:text-white rounded-md duration-300'><i className="mr-2 ri-team-fill"></i>People</Link>
                </nav>
                <hr className='mt-5 border-none h-[1px] shadow-lg bg-zinc-400' />
                <nav className='flex flex-col gap-3 text-zinc-400 text-xl  mt-5'>
                <h1 className="text-white text-xl font-bold">Website Information</h1>
                    <Link className='hover:bg-[#6556CD] p-3 hover:text-white rounded-md duration-300 '><i className="mr-2 ri-information-2-fill"></i>About Netly</Link>
                    <Link className='hover:bg-[#6556CD] p-3 hover:text-white rounded-md duration-300'><i className="mr-2 ri-phone-fill"></i>Contact</Link>
                </nav>
            </div>
        </>
    )
}

export default Sidenav