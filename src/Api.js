import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-d5cd.onrender.com/api",
});

export const fetchReviews = () => {
  return fetch("/reviews")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};
