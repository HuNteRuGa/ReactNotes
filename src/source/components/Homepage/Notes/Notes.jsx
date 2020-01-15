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
    <article className="project-list">
      <h1 className="project-list__h1">Проекты</h1>
      {projects.map((project, index) => {
        return (
          <Project
            key={project.id}
            id={project.id}
            number={index}
            title={project.title}
            description={project.description}
            tasks={project.task}
            process={project.inProcess}
            done={project.done}
          />
        );
      })}
    </article>
  );
};
