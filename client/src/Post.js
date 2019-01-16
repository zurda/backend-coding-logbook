import React from "react";
import "./Post.css";

const Post = props => {
  const { post } = props;
  return (
    <div className="post" key={post._id}>
      <h3>
        {post.title}
        <button
          className="edit-icon"
          onClick={() => props.editPostHandler(post._id)}
        >
          <i className="fas fa-edit" />
        </button>
        <button
          className="delete-icon"
          onClick={() => props.handleDelete(post._id)}
        >
          <i className="far fa-trash-alt" />
        </button>
      </h3>
      <span>{post.createdAt.slice(0, 10)}</span>
      <p>{post.message}</p>
      <div>
        <pre className="code">{post.code}</pre>
        <p>
          <a href={post.originUrl}>Origin</a>
        </p>
        {post.labels.length > 0 && (
          <ul className="labels">
            {post.labels.map(label => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Post;
