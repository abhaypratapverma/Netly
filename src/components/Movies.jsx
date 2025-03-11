import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import axios from '../utils/Axios';
import Cards from './templates/Cards';
import Loader from './templates/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
const Movies = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [movie, setmovie] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = "Netly | Movies "+category.toUpperCase();
    const GetMovie = async () => {
        try {
            const { data } = await axios.get(
                `/movie/${category}?page=${page}`
            );
            console.log(data);
            if (data.results.length > 0) {
                setmovie((prev) => [...prev, ...data.results]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Error fetching movie data:", err);
        }
    };
   
    const RefreshHandler = async () => {
        setPage(1);
        setmovie([]);
        setHasMore(true);
        await GetMovie(); // ✅ Fetch new data after resetting
    };

    useEffect(() => {
        RefreshHandler();
    }, [category]);
  return movie.length>0? (
    <div className="w-screen h-screen">
            {/* Header Section */}
            <div className="w-full flex items-center justify-between py-4">
                <h1 className="text-2xl text-zinc-400 font-semibold flex items-center">
                    <i
                        onClick={() => navigate(-1)}
                        className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD] transition-colors duration-200 mr-2 text-xl"
                    ></i>
                    Movies
                </h1>
                <Topnav />
                <div className="flex gap-4">
                    <Dropdown
                        title="Category"
                        options={["popular","top_rated","upcoming","now_playing"]}
                        selectedValue={category}
                        func={(value) => setCategory(value.toLowerCase())}
                    />
                   
                </div>
            </div>

            <InfiniteScroll
                dataLength={movie.length}
                next={GetMovie}
                hasMore={hasMore} // ✅ Corrected
                loader={<Loader />}
                className="flex flex-wrap justify-center w-full h-full mt-5"
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all.</b>
                    </p>
                }
            >
                <Cards data={movie} title="movie" />
            </InfiniteScroll>
        </div>
  ):<Loader />
}

export default Movies