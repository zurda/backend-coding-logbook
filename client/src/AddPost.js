import React, { Component } from "react";
import axios from "axios";
import "./form.css";

class AddPost extends Component {
  state = {
    title: "",
    message: "",
    code: "",
    originUrl: null,
    labels: [],
    isPublic: "public"
  };

  newPostSubmit = () => {
    const { title, message, code, originUrl, labels, isPublic } = this.state;
    axios({
      url: "/api/putData",
      method: "post",
      data: {
        message: message,
        title: title,
        code: code,
        originUrl: originUrl,
        labels: labels,
        isPublic: isPublic
      },
      withCredentials: true
    })
      .then(res => {
        if (res.data.success) {
          this.handleRedirect("/");
        } else {
          console.log("PROBLEM WITH INPUTS");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  handleRedirect = path => {
    window.location.href = path;
  };
  render() {
    return (
      <div className="input add">
        <div className="form">
          <h2>Add a Log</h2>
          <input
            type="text"
            className="input-field"
            onChange={e => this.setState({ title: e.target.value })}
            placeholder="add title"
          />
          <textarea
            type="text"
            className="input-field"
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="add post"
            style={{ dheight: "60px" }}
          />
          <textarea
            type="text/javascript"
            className="input-field"
            onChange={e => this.setState({ code: e.target.value })}
            placeholder="add code"
            style={{ height: "60px" }}
          />
          <input
            type="text"
            className="input-field"
            onChange={e => this.setState({ originUrl: e.target.value })}
            placeholder="add link"
          />
          <input
            type="text"
            className="input-field"
            onChange={e => this.setState({ labels: e.target.value.split(",") })}
            placeholder="add labels"
          />
          <div className="radio">
            <label className="radio-btn">
              <input
                type="radio"
                value="public"
                checked={this.state.isPublic === "public"}
                onChange={e => this.setState({ isPublic: e.target.value })}
              />
              Public
            </label>
            <label className="radio-btn">
              <input
                type="radio"
                value="private"
                checked={this.state.isPublic === "private"}
                onChange={e => this.setState({ isPublic: e.target.value })}
              />
              Private
            </label>
          </div>
          <button type="submit" onClick={() => this.newPostSubmit()}>
            Add a Log
          </button>
        </div>
      </div>
    );
  }
}

export default AddPost;
