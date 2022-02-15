import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Trending.css";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [PageTotal, setPageTotal] = useState(0);

  // const fetchData = useCallback(async () => {
  //   const { data } = await axios.get(
  //     `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_TMDB_KEY}&page=${page}`
  //   );
  //   console.log({trending: data})
  //   setContent(data.results);
  //   setPageTotal(data.total_pages);
  // }, [page])

  // useEffect(() => {
  //   fetchData()
  // }, [fetchData])

  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_TMDB_KEY}&page=${page}`
      );
      // console.log({ trending: data });
      setContent(data.results);
      setPageTotal(data.total_pages);
    };

    fetchTrending();
    // return () => {
    //   fetchTrending({}); // unmounting
    // };
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((item) => <SingleContent key={item.id} item={item} media_type={item.media_type} />)}
      </div>

      <CustomPagination setPage={setPage} PageTotal={PageTotal} />
    </div>
  );
};

export default Trending;
