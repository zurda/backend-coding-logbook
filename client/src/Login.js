import React, { Component } from "react";
import "./form.css";
class Login extends Component {
  state = {
    logemail: null,
    logpassword: null
  };
  render() {
    return (
      <div className="form">
        <h2>Login</h2>
        <input
          type="text"
          className="input-field"
          onChange={e => this.setState({ logemail: e.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          className="input-field"
          onChange={e => this.setState({ logpassword: e.target.value })}
          placeholder="Password"
        />

        <button
          type="submit"
          onClick={() => this.props.handleLogin(this.state)}
        >
          Login
        </button>
      </div>
    );
  }
}

export default Login;
