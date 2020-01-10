import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import Tasks from "./Tasks";
import NewTask from "../../../../containers/Homepage/Project/newTask";

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

  const getShowLink = (show, allShow, showFunc) => {
    const hide = !isShowAll(allShow) && show;
    return (
      <a
        className="cards-list__show-all"
        onClick={hide ? () => props.onShowAll() : () => showFunc()}>
        {hide ? "Показать все" : "Развернуть"}
      </a>
    );
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
            {getShowLink(show.tasks, show, props.onShowTasks)}
            {props.projects.showAddTask ? <NewTask id={project.id} /> : ""}
          </section>
          <section className={getCardsClass(show.inProcess, show)}>
            <h3 className="cards-list__header">В процессе</h3>
            {getShowLink(show.inProcess, show, props.onShowInProcess)}
          </section>
          <section className={getCardsClass(show.done, show)}>
            <h3 className="cards-list__header">Завершено</h3>
            {getShowLink(show.done, show, props.onShowDone)}
          </section>
        </section>
      </article>
    );
  }
};
