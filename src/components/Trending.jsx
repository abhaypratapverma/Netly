import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import axios from '../utils/Axios';
import Cards from './templates/Cards';
import Loader from './templates/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
    
    const navigate = useNavigate();
    const [category, setCategory] = useState("all");
    const [duration, setDuration] = useState("day");
    const [trending, setTrending] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = "Netly | Trending "+category.toUpperCase();
    const GetTrending = async () => {
        try {
            const { data } = await axios.get(
                `trending/${category.toLowerCase()}/${duration.toLowerCase()}?page=${page}`
            );

            if (data.results.length > 0) {
                setTrending((prev) => [...prev, ...data.results]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Error fetching trending data:", err);
        }
    };

    const RefreshHandler = async () => {
        setPage(1);
        setTrending([]);
        setHasMore(true);
        await GetTrending(); // ✅ Fetch new data after resetting
    };

    useEffect(() => {
        RefreshHandler();
    }, [category, duration]);

    return (
        <div className="w-screen h-screen">
            {/* Header Section */}
            <div className="w-full flex items-center justify-between py-4">
                <h1 className="text-2xl text-zinc-400 font-semibold flex items-center">
                    <i
                        onClick={() => navigate(-1)}
                        className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD] transition-colors duration-200 mr-2 text-xl"
                    ></i>
                    Trending 
                </h1>
                <Topnav />
                <div className="flex gap-4">
                    <Dropdown
                        title="Category"
                        options={["All", "TV", "Movie"]}
                        func={(value) => setCategory(value.toLowerCase())}
                    />
                    <Dropdown
                        title="Duration"
                        options={["Day", "Week"]}
                        func={(value) => setDuration(value.toLowerCase())}
                    />
                </div>
            </div>

            <InfiniteScroll
                dataLength={trending.length}
                next={GetTrending}
                hasMore={hasMore} // ✅ Corrected
                loader={<Loader />}
                className="flex flex-wrap justify-center w-full h-full mt-5"
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all.</b>
                    </p>
                }
            >
                <Cards data={trending} title={category} />
            </InfiniteScroll>
        </div>
    );
};

export default Trending;
