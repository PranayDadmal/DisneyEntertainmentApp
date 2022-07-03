import  React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot'; 
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';



export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  let navigate = useNavigate()

  useEffect(() => {
    if( value === 0) navigate("/");
    else if(value === 1) navigate("/movies");
    else if(value === 2) navigate("/series");
    else if(value === 3) navigate("/search");
  }, [value, navigate])
  

  return (
    <Box sx={{ width: '100%', position: "fixed", bottom: 0, zIndex: 100}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{backgroundColor:'#2d313a'}}
      >
        <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} style={{backgroundColor:'#2d313a', color:"white"}} />
        <BottomNavigationAction label="Movies" icon={<MovieIcon />} style={{backgroundColor:'#2d313a', color:"white"}} />
        <BottomNavigationAction label="TV" icon={<TvIcon />} style={{backgroundColor:'#2d313a', color:"white"}} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} style={{backgroundColor:'#2d313a', color:"white"}} />

      </BottomNavigation>
      </Box>

  );
}
