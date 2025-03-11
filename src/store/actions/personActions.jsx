import { loadperson } from '../reducers/personSlice.jsx';
import axios from '../../utils/axios.jsx';

export const asyncloadperson = (id) => async (dispatch) => {
    try {
        if (!id) {
            console.error("Invalid person ID!");
            return;
        }

        const [detail, externalid,combined_credits,tvcredits,movie_credits] = await Promise.all([
            axios.get(`/person/${id}`),
            axios.get(`/person/${id}/external_ids`),
            axios.get(`/person/${id}/combined_credits`),
            axios.get(`/person/${id}/tv_credits`),
            axios.get(`/person/${id}/movie_credits`),
           
        ]);

        const theultimatedata = {
            detail: detail.data,
            externalid: externalid.data,
            combined_credits: combined_credits.data,
            tvcredits: tvcredits.data,
            movie_credits: movie_credits.data,
        };

        dispatch(loadperson(theultimatedata));

    } catch (error) {
        console.error("Error fetching person data:", error);
    }
};
