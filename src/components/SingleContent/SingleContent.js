import React from "react";
import { img_300, unavailable } from "../../config/config";
import './SingleContent.css'
import Badge from '@mui/material/Badge';


const SingleContent = ({ item }) => {
  // console.log(item)
  return (
    <div className="media">

      <Badge 
        badgeContent={item.vote_average} 
        color={ item.vote_average >= 7 ? 'primary': 'secondary' }
      />

      <img
        className="poster"
        src={ item.poster_path ? `${img_300}/${item.poster_path}` : unavailable }
        alt={ item.title || item.name }
      />

      <b className="title">{ item.title || item.name }</b>

      <span className="subTitle">
        { item.media_type === 'tv' ? "TV Series" : "Movie" }
        <span>{ item.first_air_date || item.release_date  }</span>
      </span>

    </div>
  );
};

export default SingleContent;
