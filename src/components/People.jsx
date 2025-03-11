import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import axios from "../utils/Axios";
import Cards from "./templates/Cards";
import Loader from "./templates/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
    const navigate = useNavigate();
    const [person, setPerson] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        document.title = `Netly | People`;
    }, []);

    const GetPeople = async (newPage = page) => {
        try {
            const { data } = await axios.get(`/person/popular?page=${newPage}`);
            if (data.results.length > 0) {
                setPerson((prev) => [...prev, ...data.results]);
                setPage(newPage + 1); // ✅ Ensures correct pagination
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Error fetching People data:", err);
        }
    };

    useEffect(() => {
        setPage(1);
        setPerson([]);
        setHasMore(true);
        GetPeople(1); // ✅ Fetch new data after resetting
    }, []);

    return person.length > 0 ? (
        <div className="w-screen h-screen">
            {/* Header Section */}
            <div className="w-full flex items-center justify-between py-4">
                <h1 className="text-2xl text-zinc-400 font-semibold flex items-center">
                    <i
                        onClick={() => navigate(-1)}
                        className="ri-arrow-left-line cursor-pointer hover:text-[#6556CD] transition-colors duration-200 mr-2 text-xl"
                    ></i>
                    People
                </h1>
                <Topnav />
            </div>

            <InfiniteScroll
                dataLength={person.length}
                next={() => GetPeople(page)} // ✅ Uses correct page value
                hasMore={hasMore}
                loader={<Loader />}
                className="flex flex-wrap justify-center w-full h-full mt-5"
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all.</b>
                    </p>
                }
            >
                <Cards data={person} title="person" />
            </InfiniteScroll>
        </div>
    ) : (
        <Loader />
    );
};

export default People;
