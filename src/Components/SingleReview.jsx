import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleReview } from "../Api";
import { Link } from "react-router-dom";

const Review = () => {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchSingleReview(review_id).then((data) => {
      setIsLoading(false);
      setSingleReview(data.review);
    });
  }, [review_id]);

  if (isLoading) {
    return <p>Review Loading...</p>;
  }

  return (
    <main>
      <p className="Review_title">
        {singleReview.title} by {singleReview.owner}
      </p>
      <p>Category: {singleReview.category}</p>
      <img
        className="img2"
        src={singleReview.review_img_url}
        alt={singleReview.Review_name}
      />
      <p>{singleReview.review_body}</p>
      <p>{singleReview.created_at}</p> <p>votes: {singleReview.votes}</p>
      <Link to="/">Home</Link> <Link to="/reviews">All Reviews</Link>;
    </main>
  );
};

export default Review;
