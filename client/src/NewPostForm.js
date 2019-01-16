import React, { Component } from "react";
import axios from "axios";

class NewPostForm extends Component {
  state = {
    content: null,
    title: null,
    code: "",
    originUrl: null,
    isPublic: "public",
    labels: []
  };

  render() {
    return (
      <div className="input add" style={{ padding: "10px" }}>
        <form>
          <h2>Add a Log</h2>
          <input
            type="text"
            className="input-field"
            onChange={e => this.setState({ title: e.target.value })}
            placeholder="add title"
            style={{ display: "block", width: "400px" }}
          />
          <textarea
            type="text"
            className="input-field"
            onChange={e => this.setState({ content: e.target.value })}
            placeholder="add post"
            style={{ display: "block", width: "400px", height: "60px" }}
          />
          <textarea
            type="text/javascript"
            className="input-field"
            onChange={e => this.setState({ code: e.target.value })}
            placeholder="add code"
            style={{ display: "block", width: "400px", height: "60px" }}
          />
          <input
            type="text"
            className="input-field"
            onChange={e => this.setState({ originUrl: e.target.value })}
            placeholder="add link"
            style={{ display: "block", width: "400px" }}
          />
          <input
            type="text"
            className="input-field"
            onChange={e =>
              this.setState({
                labels: e.target.value.split(",")
              })
            }
            placeholder="add labels"
            style={{ display: "block", width: "400px" }}
          />
          <div className="radio">
            <label>
              <input
                type="radio"
                value="public"
                checked={this.state.isPublic === "public"}
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
                checked={this.state.isPublic === "private"}
                onChange={e => this.setState({ isPublic: e.target.value })}
              />
              Private
            </label>
          </div>
          <button
            type="submit"
            onClick={() =>
              this.putDataToDB(
                this.state.title,
                this.state.content,
                this.state.code,
                this.state.originUrl,
                this.state.labels,
                this.state.isPublic
              )
            }
          >
            Add a Log
          </button>
        </form>
      </div>
    );
  }
}

export default NewPostForm;
