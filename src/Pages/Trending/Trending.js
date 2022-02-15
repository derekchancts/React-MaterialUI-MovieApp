import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Trending.css";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { styled } from "@mui/material/styles";




const StyledDiv = styled('div')(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",

  // [theme.breakpoints.up('md')]: {
  //   backgroundColor: 'red',
  // },
  // [theme.breakpoints.down('sm')]: {
  //   margin: '30px 0'
  // },
}));


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
      
      <StyledDiv>
      {/* <div className="trending"> */}
        {content &&
          content.map((item) => <SingleContent key={item.id} item={item} media_type={item.media_type} />)}
      {/* </div> */}
      </StyledDiv>

      <CustomPagination setPage={setPage} PageTotal={PageTotal} />
    </div>
  );
};

export default Trending;
