import React, { useState, useEffect } from 'react'
import axios from "axios";
import Chip from '@mui/material/Chip';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '../../Mui/theme'
import DeleteIcon from '@mui/icons-material/Delete';
import Sort from '../hooks/useSort'
import useSort from '../hooks/useSort'


const Genres = ({   
  selectedGenres,
  setSelectedGenres,
  // genres,
  // setGenres,
  type,
  setPage,}) => {

  const [genres, setGenres] = useState([]);
  // console.log({genres}) 


  const handleAdd = (genre) => {
    const newArray = [...selectedGenres, genre];
    const sortedArray = Sort(newArray)
    setSelectedGenres(sortedArray);

    setGenres(genres.filter((g) => g.id !== genre.id));
    
    setPage(1);
  };


  const handleRemove = (genre) => {
    setSelectedGenres( selectedGenres.filter(selected => selected.id !== genre.id) );

    const newArray = [...genres, genre];
    const sortedArray = Sort(newArray);
    setGenres(sortedArray);

    setPage(1);
  };


  const HandleRemove = (genre) => {
    setSelectedGenres( selectedGenres.filter(selected => selected.id !== genre.id) );

    const newArray = [...genres, genre];
    const sortedArray = useSort(newArray);
    setGenres(sortedArray);

    setPage(1);
  };



  // const handleDelete = () => {}

  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
      );
      setGenres(data.genres); 
    };
    fetchGenres();

    return () => {
      setGenres({}); // unmounting
    };
  }, [type]);

  // console.log({ genres })


  return (
    <div style={{ padding: "6px 0" }}>
      <ThemeProvider theme={darkTheme}>

      { selectedGenres && selectedGenres.map((genre) => (
        <Chip
          sx={{ margin: "2px" }} 
          label={genre.name}
          key={genre.id}
          clickable
          size='small'
          color="primary"
          onDelete={() => handleRemove(genre)}
          // deleteIcon={<DeleteIcon />}  
        />
      )) }

      { genres && genres.map((genre) => (
        <Chip
          sx={{ margin: "2px" }} 
          label={genre.name}
          key={genre.id}
          clickable
          size='small'
          onClick={() => handleAdd(genre)}
        />
      )) }

      {/* <Chip label="Deletable" onDelete={handleDelete} />
      <Chip label="Deletable" variant="outlined" onDelete={handleDelete} /> */}

      </ThemeProvider>
    </div>
  )
}

export default Genres