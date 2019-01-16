import React, { Component } from "react";
import "./EditPost.css";

class Post extends Component {
  state = {
    ...this.props.post
  };
  render() {
    return (
      <div className="edit-form">
        <h3>Edit this log</h3>
        <br />
        <input
          type="text"
          value={this.state.title}
          className="input-field"
          onChange={e => this.setState({ title: e.target.value })}
          placeholder="add title"
        />
        <textarea
          type="text"
          value={this.state.message}
          className="input-field"
          onChange={e => this.setState({ message: e.target.value })}
          placeholder="add post"
          style={{ dheight: "60px" }}
        />
        <textarea
          type="text/javascript"
          value={this.state.code || ""}
          className="input-field"
          onChange={e => this.setState({ code: e.target.value })}
          placeholder="add code"
          style={{ height: "60px" }}
        />
        <input
          type="text"
          value={this.state.originalUrl}
          className="input-field"
          onChange={e => this.setState({ originUrl: e.target.value })}
          placeholder="add link"
        />
        <input
          type="text"
          value={this.state.labels.join(",")}
          className="input-field"
          onChange={e =>
            this.setState({
              labels: e.target.value.split(",")
            })
          }
          placeholder="add labels"
        />
        <div className="radio">
          <label>
            <input
              type="radio"
              value="public"
              checked={this.state.isPublic === true}
              onChange={e => this.setState({ isPublic: e.target.value })}
            />
            Public
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="private"
              checked={this.state.isPublic === false}
              onChange={e => this.setState({ isPublic: e.target.value })}
            />
            Private
          </label>
        </div>
        <div className="edit-action">
          <button
            type="submit"
            onClick={() => this.props.cancelPostEdit(this.state._id)}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => this.props.handleUpdate(this.state)}
          >
            Update
          </button>
        </div>
      </div>
    );
  }
}

export default Post;
