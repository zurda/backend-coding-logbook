import React, { Component } from "react";
import "./form.css";

class SignUp extends Component {
  state = { email: null, username: null, password: null, passwordConf: null };

  render() {
    return (
      <div className="form">
        <h2>Add a User</h2>
        <input
          type="text"
          className="input-field"
          onChange={e => this.setState({ email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="text"
          className="input-field"
          onChange={e => this.setState({ username: e.target.value })}
          placeholder="Username"
        />
        <input
          type="password"
          className="input-field"
          onChange={e => this.setState({ password: e.target.value })}
          placeholder="Password"
        />
        <input
          type="password"
          className="input-field"
          onChange={e => this.setState({ passwordConf: e.target.value })}
          placeholder="Repeat Password"
        />
        <button
          type="submit"
          onClick={() => this.props.handleSignup(this.state)}
        >
          Add a User
        </button>
      </div>
    );
  }
}

export default SignUp;
