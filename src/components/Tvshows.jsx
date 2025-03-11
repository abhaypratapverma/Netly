import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import axios from "../utils/Axios";
import Cards from "./templates/Cards";
import Loader from "./templates/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const TvShows = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today");
    const [tv, settv] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        document.title = `Netly | TVs ${category.toUpperCase()}`;
    }, [category]);

    const GetTvshows = async (newPage) => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${newPage}`);
            if (data.results.length > 0) {
                settv((prev) => [...prev, ...data.results]);
                setPage((prevPage) => prevPage + 1); // ✅ Ensures correct pagination
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Error fetching TV data:", err);
        }
    };

    useEffect(() => {
        setPage(1);
        settv([]);
        setHasMore(true);
        GetTvshows(1); // ✅ Fetch new data after resetting
    }, [category]);

    return tv.length > 0 ? (
        <div className="w-screen h-screen">
            {/* Header Section */}
            <div className="w-full flex items-center justify-between py-4">
                <h1 className="text-2xl text-zinc-400 font-semibold flex items-center">
                    <i
                        onClick={() => navigate(-1)}
                        className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD] transition-colors duration-200 mr-2 text-xl"
                    ></i>
                    TVs
                </h1>
                <Topnav />
                <div className="flex gap-4">
                    <Dropdown
                        title="Category"
                        options={["on_the_air", "popular", "top_rated", "airing_today"]}
                        func={(value) => setCategory(value)}
                        selectedValue={category} // ✅ Keeps the dropdown value in sync
                    />
                </div>
            </div>

            <InfiniteScroll
                dataLength={tv.length}
                next={() => GetTvshows(page)} // ✅ Uses correct page value
                hasMore={hasMore}
                loader={<Loader />}
                className="flex flex-wrap justify-center w-full h-full mt-5"
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all.</b>
                    </p>
                }
            >
                <Cards data={tv} title="tv" />
            </InfiniteScroll>
        </div>
    ) : (
        <Loader />
    );
};

export default TvShows;
