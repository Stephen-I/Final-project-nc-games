import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-d5cd.onrender.com/api",
});

export const fetchReviews = () => {
  return gamesApi.get("/reviews").then((res) => {
    return res.data;
  });
};

export const fetchSingleReview = (reviewsId) => {
  return gamesApi.get(`/reviews/${reviewsId}`).then((res) => {
    return res.data;
  });
};

export const fetchComments = (reviewsId) => {
  return gamesApi.get(`/reviews/${reviewsId}/comments`).then((res) => {
    return res.data;
  });
};
