export const fetchReviews = () => {
  return fetch("https://nc-games-d5cd.onrender.com/api/reviews")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};
