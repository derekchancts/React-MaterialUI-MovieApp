import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./Trending.css";
import SingleContent from '../../components/SingleContent/SingleContent'


const Trending = () => {
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_TMDB_KEY}`)
    console.log({data})
    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending()
  }, []);
  

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {
          content && content.map(item => (
           <SingleContent 
            key={item.id}
           />
          ))
        }
      </div>
    </div>
  )
}

export default Trending