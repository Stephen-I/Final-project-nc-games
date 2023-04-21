import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-d5cd.onrender.com/api",
});

export const fetchReviews = () => {
  return gamesApi.get(`/reviews`).then((res) => {
    return res.data;
  });
};

// export const fetchReviewsByCategories = (Category) => {
//   return gamesApi
//     .get(`/reviews`, {
//       params: { category: Category },
//     })
//     .then((res) => {
//       return res.data;
//     });
// };

export const fetchSingleReview = (reviewsId) => {
  return gamesApi.get(`/reviews/${reviewsId}`).then((res) => {
    return res.data;
  });
};

export const fetchComments = (reviewId) => {
  return gamesApi.get(`/reviews/${reviewId}/comments`).then((res) => {
    return res.data;
  });
};

export const postComments = (newComment, reviewId) => {
  return gamesApi
    .post(`/reviews/${reviewId}/comments`, newComment)
    .then((res) => res.data.comment);
};

export const fetchCategories = () => {
  return gamesApi.get(`/categories`).then((res) => res.data);
};
