import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="icons">
        <a href="https://github.com/zurda">
          <i className="fab fa-github fa-2x" />
        </a>
        <a href="https://twitter.com/zurdev">
          <i className="fab fa-twitter fa-2x" />
        </a>
        <a href="https://www.linkedin.com/in/zurda/">
          <i className="fab fa-linkedin fa-2x" />
        </a>
        <div className="links">
          <Link to="/" className="link-btn">
            home
          </Link>
          <Link to="/add-post" className="link-btn">
            Add post
          </Link>
          <Link to="/login" className="link-btn">
            Log in
          </Link>
          <Link to="/signup" className="link-btn">
            Signup
          </Link>
        </div>
      </div>

      <h1>Coding Logbook</h1>
      <h3>Never loose a reference!</h3>
    </div>
  );
};

export default Header;
