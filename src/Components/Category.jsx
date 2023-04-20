import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchReviews } from "../Api";

const CategoryLinks = (selectedCategory) => {
  const [Reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchReviews(selectedCategory.selectedCategory).then((data) => {
      setIsLoading(false);
      setReviews(data.reviews);
    });
  }, [selectedCategory.selectedCategory]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <Link to="/">Home</Link>

      <ul>
        {Reviews.map((Review) => {
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
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default CategoryLinks;
