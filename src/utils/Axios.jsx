import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers:{
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmYyMmFlY2Y1YzFiYzQ1NzI5Y2JhZWNmMTQ3YzlkYyIsIm5iZiI6MTczOTUzNDQwNi4zNTYsInN1YiI6IjY3YWYzMDQ2MTA0NjEyZTg2MzNiNjMzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JZvpHWoPLesKCHO-xRgtHGYAIi6mDHAuYFC20gGSGE8'
    }
});

export default instance;