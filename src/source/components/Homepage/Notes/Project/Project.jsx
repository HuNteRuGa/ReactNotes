import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import resizeTextarea from "../../../../scripts/utils/resizeTextarea";

export default props => {
  const { id } = useParams();

  const [showNewTask, setShowNewTask] = useState(false);
  const addTask = () => setShowNewTask(true);

  useEffect(() => {
    if (props.projects.projects === null) {
      props.onBeforeLoadProjects();
      props.onLoadProjects();
    }
  });
  const projects = props.projects.projects || [];
  const project = projects[id];

  if (!project) {
    return <h1>No such project</h1>;
  } else {
    return (
      <article className="project">
        <section className="project__info project-info">
          <h1 className="project-info__title">{project.title}</h1>
          <h2 className="project-info__description">{project.description}</h2>
        </section>
        <section className="project__cards project-cards">
          <section className="project-cards__tasks cards-list">
            <h3 className="cards-list__header">
              Задания<a className="cards-list__button" onClick={() => addTask()}></a>
            </h3>
            {showNewTask ? (
              <section className="project-list__card project-card">
                <input
                  className="project-card__input-title"
                  type="text"
                  placeholder="Название дела"
                />
                <textarea
                  onInput={e => resizeTextarea(e.target)}
                  className="project-card__textarea-description"
                  placeholder="Подробная информация"></textarea>
                <a className="project-card__button-add">Добавить</a>
              </section>
            ) : (
              ""
            )}
            <section className="project-list__card project-card">
              <h4 className="project-card__title">Card titlte</h4>
              <div className="project-card__description">
                Card description... adsaf dsa fdsa gyaksd fdsa kfghas djkf gsdak gfjksa
              </div>
            </section>
          </section>
          <section className="project-cards__in-process cards-list">
            <h3 className="cards-list__header">В процессе</h3>
          </section>
          <section className="project-cards__done cards-list">
            <h3 className="cards-list__header">Завершено</h3>
          </section>
        </section>
      </article>
    );
  }
};
