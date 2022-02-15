import { useEffect, useState } from "react";
import axios from "axios";
import "./Search.css";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Tab, Tabs, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { darkTheme } from "../../Mui/theme";
import useDebounce from '../../components/hooks/useDebounce'


const Search = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [PageTotal, setPageTotal] = useState(0);
  const [type, setType] = useState(0); // 0 (false) for tv, 1 (true) for movie
  const [searchText, setSearchText] = useState("");
  // const [tempSearchText, setTempSearchText] = useState("")
 const tempSearchText= useDebounce(searchText, 400);


  const fetchSearch = async () => {
    if (searchText === '' || searchText === '') return;
     
    try {
      const { data } = await axios.get(
        // `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        
        // `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=zh-HK&page=1&include_adult=false&query=${searchText}&page=${page}`
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${searchText}&page=${page}`
      );
      setContent(data.results);
      setPageTotal(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  //  }, [type, page, searchText]);
  // eslint-disable-next-line
  }, [type, page, tempSearchText]);


  useEffect(() => {
    if (searchText === ''){
      setContent([]);
      setPageTotal(0);
    }
  },[searchText])


  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            variant="filled"
            className="searchBox"
            label="Search"
            onChange={(e) => setSearchText(e.target.value)}
      
            // onKeyPress={(e) => {
            //   if (e.key === "Enter") {
            //     console.log(e.target.value);
            //     setSearchText(e.target.value)
            //   }
            // }}
          />

          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>

        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 30 }}
          centered
        >
          <Tab style={{ minWidth: "50%", maxWidth: '100%' }} label="Search Movies" />
          <Tab style={{ minWidth: "50%", maxWidth: '100%' }} label="Search TV Series" />
        </Tabs>
       
      </ThemeProvider>


      <div className="trending">
        {content &&
          content.map(item => (
            <SingleContent
              key={item.id}
              item={item}
              media_type={type ? "tv" : "movie"}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>

      {PageTotal > 1 && (
        <CustomPagination setPage={setPage} numOfPages={PageTotal} />
      )}


    </div>
  );
};

export default Search;
