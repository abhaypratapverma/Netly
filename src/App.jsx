import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Loader from './components/templates/Loader'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movies from './components/Movies'
import TvShows from './components/TvShows'
import People from './components/People'
import MovieDetails from './components/MovieDetails'
import Tvdetails from './components/Tvdetails'
import Persondetails from './components/Persondetails'
import Trailer from './components/templates/Trailer'

function App() {
  return (
    <div className='bg-[#1F1E24] w-screen h-screen flex text-white'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movie' element={<Movies />} />
        
        {/* Movie Details + Nested Trailer Route */}
        <Route path='/movie/details/:id' element={<MovieDetails />}>
          <Route path='trailer' element={<Trailer />} />
        </Route>

        <Route path='/tv' element={<TvShows />} />
        
        {/* TV Details + Nested Trailer Route */}
        <Route path='/tv/details/:id' element={<Tvdetails />}>
          <Route path='trailer' element={<Trailer />} />
        </Route>

        <Route path='/person' element={<People />} />
        <Route path='/person/details/:id' element={<Persondetails />} />
      </Routes>
    </div>
  )
}

export default App
