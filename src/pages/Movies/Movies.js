import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleContent/SingleContent'
import Genres from '../../components/Genres'
import useGenres from '../../hooks/useGenres'

const Movies = () => {
 const [page, setPage] = useState(1);
 const [content, setContent] = useState([]);
 const [numberOfPages, setNumberOfPages] = useState();
 const [genres, setGenres] = useState([]);
 const [selectedGenres, setSelectedGenres] = useState([]);
 const genresForURL = useGenres(selectedGenres)

  useEffect(() => {
    const fetchMovies = async() => {
   
      const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresForURL}`)
      
      // console.log(data)
      setContent(data.results)
      setNumberOfPages(data.total_pages)
    }
    fetchMovies();
  }, [page, genresForURL])
  

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genres 
          type='movie'
          genres={genres}
          setGenres={setGenres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          setPage={setPage}
        />
      <div className="trending">
         {
           content && content.map((c) => (
            <SingleContent 
              key={c.id}
              id={c.id}
              media_type="Movie"
              poster={c.poster_path}
              date={c.release_date || c.first_air_date }
              title={c.title || c.name}
              vote_average={c.vote_average}
            />
           ))
         }
      </div>
      {numberOfPages>1 &&  <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />}
     
    </div>
  )
}

export default Movies