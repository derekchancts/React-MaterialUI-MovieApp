import React from "react";
import Pagination from "@mui/material/Pagination";
import makeStyles from "@mui/styles/makeStyles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../../Mui/theme";

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark'
//   }
// });

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
}));

const CustomPagination = ({ setPage, PageTotal = 10, page }) => {
  const classes = useStyles();

  // const handlePageChange = (pageNumber) => {
  //   console.log({pageNumber})
  //   setPage(pageNumber);
  //   window.scroll(0, 0);
  // };
  const handlePageChange = (e, page) => {
    console.log({ page });
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      className={classes.root}
      // style={{
      // width: "100%",
      // display: "flex",
      // justifyContent: "center",
      // marginTop: 10,
      // marginBottom: 10,
      // }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          // onChange={(e) => handlePageChange(e.target.textContent)}
          onChange={handlePageChange}
          count={PageTotal}
          color="primary"
          // hideNextButton
          // hidePrevButton
          // showFirstButton
          // showLastButton
          siblingCount={3}
          page={page}
          // boundaryCount={6}
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
