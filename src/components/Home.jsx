import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import Headers from "./templates/Headers";
import { useState, useEffect } from "react";
import axios from "../utils/Axios";
import Horizontalcards from "./templates/Horizontalcards";
import Dropdown from "./templates/Dropdown";
import Loader from "./templates/Loader";

const Home = () => {
  document.title = "Netly | Home";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState([]);
  const [category, setcategory] = useState("all");

  const Getwallpaper = async () => {
    try {
      const { data } = await axios.get("trending/all/day");
      setwallpaper(data.results[Math.floor(Math.random() * data.results.length)]);
    } catch (error) {
      console.log(error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`trending/${category}/day`); // ✅ Fixed Template String
      settrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetTrending();
    !wallpaper && Getwallpaper(); // ✅ Ensure wallpaper loads initially
    // ✅ Fetch trending when category changes
  }, [category]);

  return trending.length > 0 && wallpaper ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Headers data={wallpaper} />
        <div className=" flex justify-between p-5">
          <h1 className="text-3xl text-zinc-400 font-semibold ">Trending</h1>
          <Dropdown
            title="Filter"
            options={["All", "TV", "Movie"]}
            func={(value) => setcategory(value.toLowerCase())}
          />
        </div>
        <Horizontalcards data={trending} category={category} /> {/* ✅ Pass category */}
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Home;
