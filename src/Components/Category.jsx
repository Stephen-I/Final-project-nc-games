import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchReviews } from "../Api";

const CategoryLinks = ({ selectedCategory }) => {
  const [ReviewByCategory, setReviewByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetchReviewsByCategories(selectedCategory).then((data) => {
  //       setIsLoading(false);
  //       setReviewByCategory(data.reviews);
  //     });
  //   }, [selectedCategory]);

  useEffect(() => {
    setIsLoading(true);
    fetchReviews(selectedCategory).then((data) => {
      setIsLoading(false);
      setReviewByCategory(data.reviews);
    });
  }, [selectedCategory]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <Link to="/">Home</Link>

      <ul>
        {ReviewByCategory.map((Review) => {
          return (
            <li key={Review.review_id} className="Review">
              <Link
                to={`/reviews/${Review.review_id}`}
                className="Review_title"
              >
                {Review.owner}
              </Link>
              <img
                className="img"
                src={Review.review_img_url}
                alt={Review.Review_name}
              />
              <p className="Review_body">{Review.review_body}</p>
              <p className="Review_body">{Review.category}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default CategoryLinks;
