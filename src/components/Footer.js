import React from "react";

const Footer = () => {
  return (
    <div className="main-footer">
      <hr />
      <div className="row">
        <p className="col-sm">
          &copy;{new Date().getFullYear()} Daniel Salgado
        </p>
      </div>
    </div>
  );
};

export default Footer;
