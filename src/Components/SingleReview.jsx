import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleReview, fetchComments } from "../Api";
import { Link } from "react-router-dom";

const Review = () => {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchSingleReview(review_id).then((data) => {
      setIsLoading(false);
      setSingleReview(data.review);
    });
  }, [review_id]);

  useEffect(() => {
    setIsLoading(true);
    fetchComments(review_id).then((data) => {
      setIsLoading(false);
      setComments(data.comments);
    });
  }, [review_id]);

  if (isLoading) {
    return <p>Review Loading...</p>;
  }

  const created_atArr = singleReview.created_at.split("");
  const time = created_atArr.slice(11, 16).join("");
  const date = created_atArr.slice(0, 10).join("");

  return (
    <main>
      <p className="Single_review_title">
        {singleReview.title} by {singleReview.owner}
      </p>
      <p>Category: {singleReview.category}</p>
      <img
        className="img2"
        src={singleReview.review_img_url}
        alt={singleReview.Review_name}
      />
      <p>{singleReview.review_body}</p>
      <p>Votes: {singleReview.votes}</p>
      <p>
        {date} {time}
      </p>
      <Link to="/">Home</Link> <Link to="/reviews">All Reviews</Link>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => {
          const created_atArr = comment.created_at.split("");
          const time = created_atArr.slice(11, 16).join("");
          const date = created_atArr.slice(0, 10).join("");
          return (
            <li key={comment.review_id} className="Comment">
              <p className="Author">{comment.author}</p>
              <p className="Comment_body">{comment.body}</p>
              <p className="Comment_votes">Votes: {comment.votes}</p>
              <p className="Comment_date">
                {date} {time}
              </p>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Review;
