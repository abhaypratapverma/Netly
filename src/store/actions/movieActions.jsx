import { loadmovie, setLoading, setError } from '../reducers/movieSlice';
import axios from '../../utils/axios.jsx';

export const asyncloadmovie = (id) => async (dispatch) => {
    try {
        if (!id) {
            console.error("Invalid movie ID!");
            return;
        }

        dispatch(setLoading()); // Set loading state before fetching data

        //console.log(`Fetching movie data for ID ${id}`);

        const [detail, externalid, recommendations, similar, translations, video, watchproviders] = await Promise.all([
            axios.get(`/movie/${id}`),
            axios.get(`/movie/${id}/external_ids`),
            axios.get(`/movie/${id}/recommendations`),
            axios.get(`/movie/${id}/similar`),
            axios.get(`/movie/${id}/translations`),
            axios.get(`/movie/${id}/videos`),
            axios.get(`/movie/${id}/watch/providers`),
        ]);

        const theultimatedata = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations: translations?.data?.translations?.map((t) => t.name) || [],
            video: video.data.results.find((m) => m.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN || null,
        };

       // console.log("Dispatching loadmovie with:", theultimatedata);
        dispatch(loadmovie(theultimatedata));

    } catch (error) {
        console.error("Error fetching movie data:", error);
        dispatch(setError(error.message)); // Dispatch error state
    }
};
