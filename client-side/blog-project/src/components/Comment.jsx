import PropTypes from 'prop-types';

function Comment({ text, username, currentUser, onDelete, onUpdate }) {
  const isAdmin = currentUser.role === 'admin';
  const isCommentAuthor = currentUser.username === username;

  return (
    <div className="comment">
      <p>{text}</p>
      <p>By: {username}</p>
      {isAdmin || isCommentAuthor ? (
        <button onClick={onDelete}>Delete</button>
      ) : null}
      {isCommentAuthor ? <button onClick={onUpdate}>Edit</button> : null}
    </div>
  );
}

Comment.propTypes = {
  text: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired, // Add this line
};

export default Comment;
