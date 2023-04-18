import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleReview, fetchComments } from "../Api";
import { Link } from "react-router-dom";

const Review = () => {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  let date = "";
  let time = "";

  useEffect(() => {
    setIsLoading(true);
    fetchSingleReview(review_id).then((data) => {
      setIsLoading(false);
      setSingleReview(data.review);
    });
  }, [review_id]);
  console.log(singleReview.votes);
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

  function splitCreatedAt(obj) {
    const created_atArr = obj.created_at.split("");
    time = created_atArr.slice(11, 16).join("");
    date = created_atArr.slice(0, 10).join("");
    return date, time;
  }
  splitCreatedAt(singleReview);

  function upVote() {
    setVotes((currentVotes) => currentVotes + 1);
  }

  function downVote() {
    setVotes((currentVotes) => currentVotes - 1);
  }

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
      <p>Votes: {singleReview.votes + votes}</p>
      <p>
        {date} {time}
      </p>
      <form>
        <div className="RadioBtn Container">
          <input
            onChange={upVote}
            type="radio"
            id="UpVote"
            name="Voting"
            value={singleReview.votes}
          />
          <label for="UpVote">UpVote</label>

          <input
            onChange={downVote}
            type="radio"
            id="DownVote"
            name="Voting"
            value={singleReview.votes}
          />
          <label for="DownVote">DownVote</label>
        </div>
      </form>
      <Link to="/">Home</Link> <Link to="/reviews">All Reviews</Link>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => {
          splitCreatedAt(comment);
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
