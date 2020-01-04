import React from "react";
import { Link } from "react-router-dom";

export default props => {
  const title = props.title.length > 14 ? `${props.title.substr(0, 12)}...` : props.title;
  return (
    <section className="project-list--little__one-project one-project--little">
      <h3 className="one-project--little__title">{title}</h3>
      <Link className="one-project--little__open" to={`/project/${props.number}`}>
        Перейти
      </Link>
    </section>
  );
};
