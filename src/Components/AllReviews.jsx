import { useState, useEffect } from "react";
import { fetchReviews } from "../Api";
import { Link } from "react-router-dom";

function ReviewList() {
  const [Reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchReviews().then((data) => {
      setIsLoading(false);
      setReviews(data.reviews);
      console.log(data);
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <Link to="/">Home</Link>

      <ul className="container">
        {Reviews.map((Review) => {
          return (
            <li key={Review.id} className="Review">
              <p className="Review_title">{Review.title}</p>
              <img
                className="img"
                src={Review.review_img_url}
                alt={Review.Review_name}
              />
              <p>{Review.review_body}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default ReviewList;
