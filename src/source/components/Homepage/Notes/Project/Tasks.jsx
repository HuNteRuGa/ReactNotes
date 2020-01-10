import React from "react";

export default props => {
  reutrn(
    <>
      {props.tasks.map((task, index) => {
        return (
          <section className="project-list__card project-card" key={index}>
            <h4 className="project-card__title">{task.title}</h4>
            <div className="project-card__description">{task.description}</div>
          </section>
        );
      })}
    </>
  );
};
