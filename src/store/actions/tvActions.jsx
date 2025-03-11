import { loadtv } from '../reducers/tvSlice.jsx';
import axios from '../../utils/axios.jsx';

export const asyncloadtv = (id) => async (dispatch) => {
    try {
        if (!id) {
            console.error("Invalid TV ID!");
            return;
        }

        const [detail, externalid, recommendations, similar, translations, video, watchproviders] = await Promise.all([
            axios.get(`/tv/${id}`),
            axios.get(`/tv/${id}/external_ids`),
            axios.get(`/tv/${id}/recommendations`),
            axios.get(`/tv/${id}/similar`),
            axios.get(`/tv/${id}/translations`),
            axios.get(`/tv/${id}/videos`),
            axios.get(`/tv/${id}/watch/providers`),
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

        dispatch(loadtv(theultimatedata));

    } catch (error) {
        console.error("Error fetching TV data:", error);
    }
};
