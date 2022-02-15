import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres/Genres";
import useGenre from "../../components/hooks/useGenre";

const Movies = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [PageTotal, setPageTotal] = useState(0);
  // const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  // console.log({selectedGenres});
  const genreforURL = useGenre(selectedGenres);
  // console.log({genreforURL})

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get(
        // `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`
        // `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=zh-HK&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`
      );
      // console.log({ movies: data });
      setContent(data.results);
      setPageTotal(data.total_pages);
    };

    fetchMovies();
    // return () => {
    //   fetchMovies({}); // unmounting
    // };
  }, [page, genreforURL]);

  return (
    <>
      <span className="pageTitle">Movies</span>

      <div className="genre">
        <Genres
          type="movie"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          // genres={genres}
          // setGenres={setGenres}
          setPage={setPage}
        />
      </div>

      <div className="trending">
        {content &&
          content.map((item) => <SingleContent key={item.id} item={item} media_type="movie" />)}
      </div>

      {PageTotal > 1 && (
        <CustomPagination page={page} setPage={setPage} PageTotal={PageTotal} />
      )}
    </>
  );
};

export default Movies;
