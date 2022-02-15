import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { styled } from "@mui/material/styles";
import { Modal, Backdrop, Button, Fade, Paper } from '@mui/material'
import axios from "axios";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config"
import "./ContentModal.css";
import YouTubeIcon from '@mui/icons-material/YouTube';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import Carousel from "../Carousel/Carousel";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));


const StyledModal = styled(ModalUnstyled)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "90%",
  height: "80%",
  backgroundColor: "#39445a",
  border: "1px solid #282c34",
  borderRadius: 10,
  color: "white",
  boxShadow: theme.shadows[5],
  padding: theme.spacing(1, 1, 3),
}));


const ContentModal = ({  media_type, id, children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();


  const handleOpen = async () => {
    await fetchData();
    await fetchVideo();
    setOpen(true);
  }

  const handleClose = () => setOpen(false);


  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    );
    // console.log({ movieDetails: data });
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    );
    // console.log({ video: data });
    setVideo(data.results[0]?.key);  // get the 1st clip out of possible many clips returned
  };


  // useEffect(() => {
  //   fetchData();
  //   fetchVideo();
  //   // eslint-disable-next-line
  // }, []);
  


  return (
    <>
      <div
        // className="media"
        style={{ cursor: "pointer" }}
        // color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>

      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        // BackdropComponent={Backdrop}
        // BackdropProps={{
        //   timeout: 500,
        // }}
      >
        <>
          <Fade in={open}>
          {content && (
            <StyledPaper>
         
              <div className="Modal">
                <CancelIcon 
                  className="Modal__close"
                  onClick={handleClose}
                />
              </div>

              <div className="ContentModal">

                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />

                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />


                <div className="ContentModal__about">

                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>

                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div className="ContentModal__carousel">
                    <Carousel id={id} media_type={media_type} />
                  </div>


                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                  
                </div>


              </div>
              
            </StyledPaper>
          )}
          </Fade>
        </>

      </Modal>

  </>
  )
}

export default ContentModal