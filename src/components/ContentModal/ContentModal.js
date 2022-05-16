import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { ReactComponent as Star } from "../../assets/star.svg";
import { ReactComponent as Like } from "../../assets/like.svg";
import { ReactComponent as Dislike } from "../../assets/dislike.svg";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import "./ContentModal.css";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../Carousel/Carousel";

//
import { firestore } from "../../Firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

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

export default function TransitionsModal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  //
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
    console.log("japanaam", data.title);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };
  const fetchReviews = async () => {
    const querySnapshot = await getDocs(collection(firestore, "reviews"));
    console.log(querySnapshot);
    const records = [];
    querySnapshot.forEach((doc) => {
      records.push(doc.data());
    });
    setReviews(records);
    console.log(records);
    const record = records.filter((r) => {
      return r.movieId === id;
    });
    console.log(record);
    if (record.length > 0) {
      console.log(record[0]);
      setLikes(record[0].likes);
      setDislikes(record[0].dislikes);
    }
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    fetchReviews();

    // eslint-disable-next-line
  }, []);

  const submitReview = async () => {
    if (
      localStorage.getItem("user") === null ||
      typeof localStorage.getItem("user") == "undefined"
    ) {
      window.alert("please sign i first");
    } else {
      const userString = localStorage.getItem("user");
      const user = JSON.parse(userString);
      const review = {
        rating,
        reviewText,
        name: user.displayName,
        movieId: content.id,
        likes: likes,
        dislikes: dislikes,
      };
      const newRef = doc(collection(firestore, "reviews"));
      const res = await setDoc(newRef, review);
      console.log(res);
    }
  };
  console.log(dislikes, likes);
  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
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
                  <span
                    style={{ fontSize: "2rem" }}
                    className="ContentModal__title"
                  >
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>

                  <span
                    style={{ fontSize: "1rem" }}
                    className="ContentModal__description"
                  >
                    {content.overview}
                  </span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Star style={{ height: "24px", width: "24px" }} />
                    <span style={{ fontSize: "1.4rem", marginLeft: "10px" }}>
                      {content.vote_average}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: "1rem",
                        marginLeft: "10px",
                        marginRight: "6px",
                      }}
                    >
                      {likes}
                    </span>

                    <Like
                      style={{ height: "24px", width: "24px" }}
                      onClick={() => {
                        setLikes(likes + 1);
                      }}
                    />
                    <span
                      style={{
                        fontSize: "1rem",
                        marginLeft: "10px",
                        marginRight: "6px",
                      }}
                    >
                      {dislikes}
                    </span>
                    <Dislike
                      style={{ height: "24px", width: "24px" }}
                      onClick={() => {
                        setDislikes(dislikes + 1);
                      }}
                    />
                  </div>
                  <div style={{ margin: "10px" }}>
                    <spa></spa>
                    {"Rate this Movie: "}
                    <input
                      placeholder="rating"
                      type="text"
                      style={{
                        background: "#39445A",
                        color: "#EEEEEE",
                        marginBottom: "10px",
                      }}
                      value={rating}
                      onChange={(e) => {
                        setRating(e.target.value);
                      }}
                    />
                  </div>

                  <textarea
                    placeholder="write review here"
                    style={{
                      height: "10rem",
                      background: "#39445A",
                      color: "#EEEEEE",
                      marginBottom: "10px",
                    }}
                    value={reviewText}
                    onChange={(e) => {
                      setReviewText(e.target.value);
                    }}
                  />
                  <Button
                    style={{ marginBottom: "10px" }}
                    variant="contained"
                    color="primary"
                    onClick={submitReview}
                  >
                    Submit
                  </Button>

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
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
