import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres/Genres";
import useGenre from "../../components/hooks/useGenre";

const Series = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  // const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [PageTotal, setPageTotal] = useState(0);
  const genreforURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    // console.log({data})
    setContent(data.results);
    setPageTotal(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();
    // eslint-disable-next-line
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">Discover Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        // genres={genres}
        // setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((item) => <SingleContent key={item.id} item={item} media_type="tv" />)}
      </div>
      {PageTotal > 1 && (
        <CustomPagination page={page} setPage={setPage} PageTotal={PageTotal} />
      )}
    </div>
  );
};

export default Series;
