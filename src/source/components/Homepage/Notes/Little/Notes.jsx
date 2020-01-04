import React, { useEffect } from "react";

import Project from "./Project";

export default props => {
  useEffect(() => {
    if (props.projects.projects === null) {
      props.onBeforeLoadProjects();
      props.onLoadProjects();
    }
  });

  const projects = props.projects.projects || [];

  return (
    <article className="project-list--little">
      <h3 className="project-list--little__h3">Проекты</h3>
      {projects.map((project, index) => {
        return <Project key={project.id} title={project.title} id={project.id} number={index} />;
      })}
    </article>
  );
};
