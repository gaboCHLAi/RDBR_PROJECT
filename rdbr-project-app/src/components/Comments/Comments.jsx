import React, { useState, useContext, useEffect } from "react";
import "./Comments.scss";
import { MyContext } from "../dataManager/MyContext";

function Comments({ taskId }) {
  const { addComment, addReply, fetchComments, user } = useContext(MyContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState(null);

  useEffect(() => {
    const fetchTaskComments = async () => {
      const commentsData = await fetchComments(taskId);
      setComments(commentsData);
    };
    fetchTaskComments();
  }, [taskId, fetchComments]);

  const handleAddComment = () => {
    if (!newComment.trim() || !taskId) return;
    const newCommentData = {
      text: newComment.trim(),
      task_id: taskId,
    };
    addComment(newCommentData);
    setNewComment("");
  };

  const handleAddReply = (commentId) => {
    if (!newReply.trim()) {
      setReplyToCommentId(null);
      return;
    }

    const newReplyData = {
      text: newReply,
      task_id: taskId,
      parent_id: commentId,
      author_avatar: user?.avatar || "https://default-avatar-url",
      author_nickname: user?.nickname || "Anonymous",
    };

    addReply(newReplyData);
    setNewReply("");
    setReplyToCommentId(null);
  };

  return (
    <div className="comments-section">
      <div className="comment-form position-relative">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="დაწერე კომენტარი"
          className="newComment"
        />
        <button className="addComment" onClick={handleAddComment}>
          დააკომენტარე
        </button>
      </div>

      <h3>კომენტარები</h3>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="d-flex column-gap-2">
              <img
                src={comment.author_avatar}
                alt="avatar"
                className="avatar"
              />
              <div>
                <div className="nickName">{comment.author_nickname}</div>
                <p>{comment.text}</p>
              </div>
            </div>

            <button
              className="answerButton  "
              onClick={() => setReplyToCommentId(comment.id)}
            >
              <img
                src=" /assets/icons/Left 2.svg"
                alt="#"
                style={{ margin: "0" }}
              />
              <p>უპასუხე</p>
            </button>

            {replyToCommentId === comment.id && (
              <div className="reply-form">
                <textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="უპასუხე"
                  className="replay position-relative"
                />
                <button
                  onClick={() => handleAddReply(comment.id)}
                  className="submitReplay"
                >
                  პასუხის დამატება
                </button>
              </div>
            )}

            {comment.sub_comments?.map((subComment) => (
              <div className="replies" key={subComment.id}>
                <div className="reply d-flex">
                  <img
                    src={subComment.author_avatar}
                    alt="avatar"
                    className="avatar"
                  />
                  <div>
                    <div className="nickName">{subComment.author_nickname}</div>
                    <p>{subComment.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
