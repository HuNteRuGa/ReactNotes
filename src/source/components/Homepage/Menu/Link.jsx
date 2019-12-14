import React from "react";
import { Link } from "react-router-dom";

export default props => {
  return (
    <Link
      to={props.url}
      title={props.title}
      className="left-menu__links__one-link"
      style={{ backgroundImage: `url(${props.image})` }}>
      <div className="left-menu__links__one-link__submenu">
        <h4 className="left-menu__links__one-link__submenu__title">{props.title}</h4>
      </div>
    </Link>
  );
};
