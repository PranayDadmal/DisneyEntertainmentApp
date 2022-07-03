import axios from "axios"
import { useState, useEffect } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import './Trending.css';
import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = ()  => {
 const [page, setPage] = useState(1);
 const [content, setContent] = useState([]);


useEffect(() => {
  const fetchTrending = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`) ;
    console.log(data);
    setContent(data.results);
 }
 fetchTrending();
}, [page]);

 
return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
         {
           content && content.map((c) => (
            <SingleContent 
              key={c.id}
              id={c.id}
              media_type={c.media_type}
              poster={c.poster_path}
              date={c.release_date || c.first_air_date }
              title={c.title || c.name}
              vote_average={c.vote_average}
            />
           ))
         }
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  )
}

export default Trending