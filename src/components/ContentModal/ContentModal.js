import * as React from 'react';
import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape  } from '../../config/config';
import {  YouTube } from '@mui/icons-material';
import "./ContentModal.css"
import '../SingleContent/SingleContent.css';
import Carousel from './Carousel/Carousel';

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80%",
  width: "85%",
  bgcolor: '#39445a',
  border: '1px solid #282c34',
  boxShadow: 24,
  p: 4,
  color: "white",
  margin: "10px 10px"
};

const modal_style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

export default function ContentModal({children, media_type, id}) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState([])
  const [video, setVideo] = useState()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchContentModal = async() => {
        const {data}  = await
         axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`).catch(function (error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
      
        });
        setContent(data);
      }
    
  const fetchVideo = async() => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setVideo(data.results[0]?.key);
    }
    
    useEffect(() => {
      fetchContentModal();
      fetchVideo();
    
      //  eslint-disable-next-line
    }, [])



  return (
    <>
      <div style={{cursor: "pointer"}} color="inherit" onClick={handleOpen} className="media">
       {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={modal_style}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <Box sx={style}>
            <div className="ContentModal">
  
                  <img className="ContentModal__portrait "
                      src={content.poster_path? `${img_500}/${content.poster_path}` : unavailable} 
                      alt={content.name || content.title}
                       />
                  <img className="ContentModal__landscape"
                      src={content.backdrop_path? `${img_500}/${content.backdrop_path}` : unavailableLandscape} 
                      alt={content.name || content.title}
                       />   
                  <div className="ContentModal__about">
                      <span className="ContentModal__title">
                          {content.name || content.title}
                          ({
                              (content.first_air_date || content.release_date || "_ _ _ _").substring(0,4)
                          })
                       </span>
                      {content.tagline && (<i className="tagline">{content.tagline}</i>)}
                       <span className="ContentModal__description">{content.overview}</span>
                       <div>
                        <Carousel media_type={media_type} id={id}/>
                       </div>
                      <Button  
                       variant="contained"
                       startIcon={<YouTube />}
                       color="success"        
                       target="__blank"
                       href={`https://www.youtube.com/watch?v=${video}`}
                      >
                       Watch the trailer
                      </Button>
                   </div>             
                </div>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
}