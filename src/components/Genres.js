import { Chip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
const Genres = ({type,genres,setGenres,selectedGenres,setSelectedGenres,setPage}) =>{


    const handleAdd = (genre) => {

        setSelectedGenres([...selectedGenres, genre])
        setGenres(genres.filter((g) => g.id!==genre.id))
        setPage(1)
    }

    const hadleRemove = (genre) => {

        setGenres([...genres, genre])
        setSelectedGenres(selectedGenres.filter((g) => g.id!==genre.id))
        setPage(1)
    }

    const fetchGenres = async() => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        console.log(data);
        setGenres(data.genres)
     }


     useEffect(() => {
     fetchGenres();

     return () => {
        setGenres([])
     }
   //  eslint-disable-next-line
    }, [])
 

  return (
    <div style={{padding: "6px 0"}}>
       {
       selectedGenres && selectedGenres.map((genre) => (
        <Chip 
            label={genre.name} 
            key={genre.id} 
            style={{margin: 2, color:"white"}}
            color= "primary"
            size='small'
            clickable
            onDelete={() => hadleRemove(genre)}
            />
       ))
       }

       {
       genres && genres.map((genre) => (
        <Chip 
            label={genre.name} 
            key={genre.id} 
            style={{margin: 2, color:"white"}}
            color= "secondary"
            size='small'
            clickable
            onClick={() => handleAdd(genre)}
            />
       ))
       }
    </div>
  )
}

export default Genres