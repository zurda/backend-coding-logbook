import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="text">
        <p>
          Created by{" "}
          <a
            href="https://zurda.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Michal Weizman
          </a>
          <br />
          This site code is available on{" "}
          <a
            href="https://github.com/zurda/coding-logbook"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
