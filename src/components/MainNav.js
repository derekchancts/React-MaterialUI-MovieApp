import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import makeStyles from '@mui/styles/makeStyles';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from "react-router-dom";



const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 100,

    '& .MuiBottomNavigation-root': {
      backgroundColor: '#2d313a',
    },
    '& .MuiBottomNavigationAction-root': {
      color: 'white'
    },
    '& .MuiBottomNavigationAction-root .Mui-selected': {
      color: "#1976d2"
    }
  },
}))


export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const history = useHistory();
  
  // console.log(value)

  useEffect(() => {
    if (value === 0) history.push("/");
    else if (value === 1) history.push("/movies");
    else if (value === 2) history.push("/series");
    else if (value === 3) history.push("/search");
  }, [value, history]);


  return (
    <Box 
      sx={{ 
      width: '100%',
      position: 'fixed',
      bottom: 0,
      zIndex: 100,
      
      '& .MuiBottomNavigation-root': {
        backgroundColor: '#2d313a',
      },
      '& .MuiBottomNavigationAction-root': {
        color: 'white'
      },
      '& .MuiBottomNavigationAction-root .Mui-selected': {
        color: "#1976d2"
      }
    }}

      // className={classes.root}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
      >
        <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction label="TV Series" icon={<TvIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}
