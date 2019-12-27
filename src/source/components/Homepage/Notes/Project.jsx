import React from "react";
import { Link } from "react-router-dom";

import Card from "./Card";

import "../../../styles/Homepage/Projects.scss";

export default props => {
  return (
    <section className="project-list__one-project one-project">
      <h3 className="one-project__title">{props.title}</h3>
      <h4 className="one-project__description">{props.description}</h4>
      <div className="one-project__project-cards project-cards">
        <Card title="Задания" tasks={props.tasks} />
        <Card title="В процессе" tasks={props.process} />
        <Card title="Сделано" tasks={props.done} />
      </div>
      <Link className="one-project__open" to="/project/12">
        Перейти
      </Link>
    </section>
  );
};
