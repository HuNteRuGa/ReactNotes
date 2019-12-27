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
      {projects.map(project => {
        return (
          <Project
            key={project.id}
            title={project.title}
            description={project.description}
            tasks={project.tasks}
            process={project.inProcess}
            done={project.done}
          />
        );
      })}
    </article>
  );
};
