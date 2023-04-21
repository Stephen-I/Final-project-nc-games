import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchSingleReview,
  fetchComments,
  postComments,
  deleteComments,
} from "../Api";
import { Link } from "react-router-dom";

const Review = () => {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  const [commentBody, setCommentBody] = useState("");
  const [user, setuser] = useState("tickle122");
  const [hasDeleted, setHasDeleted] = useState(false);

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

  function upVote() {
    setVotes((currentVotes) => currentVotes + 1);
  }

  function downVote() {
    setVotes((currentVotes) => currentVotes - 1);
  }

  function addComment(e) {
    e.preventDefault();
    const newComment = {
      username: user,
      body: commentBody,
    };
    postComments(newComment, review_id).then((newCommentApi) => {
      setComments((currentComments) => [newCommentApi, ...currentComments]);
    });
    setCommentBody("");
  }

  function deleteComment(e) {
    deleteComments(e).then(() => {
      setHasDeleted(true);
      alert("Comment deleted");
      comments.pop();
      setComments(comments);
    });
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
      <p>{new Date(singleReview.created_at).toLocaleDateString()}</p>
      <form>
        <div className="RadioBtn Container">
          <input
            onChange={upVote}
            type="radio"
            id="UpVote"
            name="Voting"
            value={singleReview.votes}
          />
          <label htmlFor="UpVote">UpVote</label>

          <input
            onChange={downVote}
            type="radio"
            id="DownVote"
            name="Voting"
            value={singleReview.votes}
          />
          <label htmlFor="DownVote">DownVote</label>
        </div>
      </form>
      <Link to="/">Home</Link> <Link to="/reviews">All Reviews</Link>
      <h2>Comments</h2>
      <form onSubmit={addComment}>
        <input
          className="AddComment"
          type="text"
          value={commentBody}
          onChange={(e) => {
            setCommentBody(e.target.value);
          }}
          required
        ></input>
        <button type="submit" className="submitBtn">
          Add comment
        </button>
      </form>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className="Comment">
              <p className="Author">{comment.author}</p>
              <p className="Comment_body">{comment.body}</p>
              <p className="Comment_votes">Votes: {comment.votes}</p>
              <p className="Comment_date">
                {new Date(comment.created_at).toLocaleDateString()}
              </p>
              <button
                className="DeleteBtn"
                value={comment.comment_id}
                onClick={(e) => {
                  deleteComment(e.target.value);
                }}
              >
                Delete Comment
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Review;
