import React, {useState, useEffect} from 'react'
import { Button, Tabs, Tab, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

const Search = () => {
  const [type, setType] = useState(0)
  const [page, setPage] = useState(1)
  const [content, setContent] = useState([])
  const [searchText, setSearchText] = useState('')
  const [numberOfPages, setNumberOfPages] = useState()

  const fetchSearch = async() => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`)

    setContent(data.results);
    setNumberOfPages(data.total_pages);
  }

  useEffect(() => {
    window.scroll(0,0)
    fetchSearch()
  
   //  eslint-disable-next-line
  }, [type, page])
  

  return (
    <div>
      
     <div style={{width: "100%", display: 'flex'}}>
     <TextField className='searchBox' id="filled-basic" label="Search" variant="filled" 
                style={{flex: 1, backgroundColor:"white"}}
                onChange={(e) => setSearchText(e.target.value)}
                />
      <Button variant='contained' style={{marginLeft: 10}} onClick={fetchSearch}>
        <SearchIcon />
      </Button>
     </div>

     <Tabs value={type} indicatorColor="primary" textColor="primary" 
           onChange={(event,newValue) => {
            setType(newValue);
            setPage(1);
           }}>
        <Tab style={{width: "50%", color:"white"}} label="Search Movies" />
        <Tab style={{width: "50%", color:"white"}} label="Search TV Series" />
     </Tabs>

     <div className="trending">
         {
           content && content.map((c) => (
            <SingleContent 
              key={c.id}
              id={c.id}
              media_type={type ? "tv" : "movie"}
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

export default Search