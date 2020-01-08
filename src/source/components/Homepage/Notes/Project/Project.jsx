import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import resizeTextarea from "../../../../scripts/utils/resizeTextarea";

import Tasks from "./Tasks";

export default props => {
  const { id } = useParams();

  const isShowAll = allShow => {
    let showAll = true;
    Object.values(allShow).forEach(value => {
      if (!value) showAll = false;
    });
    return showAll;
  };

  const getCardsClass = (show, allShow) => {
    let flag = "--visible";
    if (isShowAll(allShow)) flag = "--visible-all";
    return `project-cards__list cards-list${show ? ` cards-list${flag}` : ""}`;
  };

  const getCardClass = show => {
    return `project-list__card project-card${show ? " project-card--visible" : ""}`;
  };

  const getShowAllClass = (show, allShow) => {
    return `cards-list__show-all${
      show && !isShowAll(allShow) ? " cards-list__show-all--visible" : ""
    }`;
  };

  useEffect(() => {
    if (props.projects.projects === null) {
      props.onBeforeLoadProjects();
      props.onLoadProjects();
    }
  });
  const projects = props.projects.projects || [];
  const project = projects[id];

  const show = {
    tasks: props.projects.showTasks,
    inProcess: props.projects.showInProcess,
    done: props.projects.showDone
  };

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
          <section className={getCardsClass(show.tasks, show)}>
            <h3 className="cards-list__header">
              Задания<a className="cards-list__button" onClick={() => props.onShowAddTask()}></a>
            </h3>
            <a className={getShowAllClass(show.tasks, show)} onClick={() => props.onShowAll()}>
              Показать все
            </a>
            {props.projects.showAddTask ? (
              <section className={getCardClass(show.tasks)}>
                <input
                  className="project-card__input-title"
                  onChange={e => props.onInputTaskTitle(e.target.value)}
                  value={props.projects.inputTaskTitle}
                  type="text"
                  placeholder="Название дела"
                />
                <textarea
                  className="project-card__textarea-description"
                  onInput={e => resizeTextarea(e.target)}
                  onChange={e => props.onInputTaskDescription(e.target.value)}
                  value={props.projects.inputTaskDescription}
                  placeholder="Подробная информация"></textarea>
                <div className="project-card__buttons-container">
                  <a className="project-card__button-add">Добавить</a>
                  <a className="project-card__button-hide" onClick={() => props.onHideAddTask()}>
                    Скрыть
                  </a>
                </div>
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
          <section className={getCardsClass(show.inProcess, show)}>
            <h3 className="cards-list__header">В процессе</h3>
          </section>
          <section className={getCardsClass(show.done, show)}>
            <h3 className="cards-list__header">Завершено</h3>
          </section>
        </section>
      </article>
    );
  }
};
