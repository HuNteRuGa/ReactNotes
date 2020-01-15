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

  const getButtonClass = (save, big) =>
    `project-info__${save ? "save" : "edit"}${
      big ? ` project-info__${save ? "save" : "edit"}--big` : ""
    }`;

  const getTitleAction = save => {
    save
      ? props.onSaveProjectTitle({
          id: project.id,
          title: props.projects.inputEditProjectTitle
        })
      : props.onShowEditProjectTitle();
  };
  const getDescriptionAction = save => {
    save
      ? props.onSaveProjectDescription({
          id: project.id,
          description: props.projects.inputEditProjectDescription
        })
      : props.onShowEditProjectDescription();
  };

  useEffect(() => {
    if (props.projects.projects === null) {
      props.onBeforeLoadProjects();
      props.onLoadProjects();
    }
    if (props.projects.openedProjectNumber !== id) {
      props.onSetOpenedProjectNumber(id);
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
          <h1 className="project-info__title">
            {props.projects.showEditProjectTitle ? (
              <input
                className="project-info__edit-title"
                type="text"
                onChange={e => props.onInputEditProjectTitle(e.target.value)}
                value={props.projects.inputEditProjectTitle}
              />
            ) : (
              project.title
            )}
            <input
              className={getButtonClass(props.projects.showEditProjectTitle, true)}
              type="submit"
              value=""
              onClick={() => getTitleAction(props.projects.showEditProjectTitle)}
            />
          </h1>
          <h2 className="project-info__description">
            {props.projects.showEditProjectDescription ? (
              <input
                className="project-info__edit-description"
                type="text"
                onChange={e => props.onInputEditProjectDescription(e.target.value)}
                value={props.projects.inputEditProjectDescription}
              />
            ) : (
              project.description
            )}
            <input
              className={getButtonClass(props.projects.showEditProjectDescription, false)}
              type="submit"
              value=""
              onClick={() => getDescriptionAction(props.projects.showEditProjectDescription)}
            />
          </h2>
        </section>
        <section className="project__cards project-cards">
          <section className={getCardsClass(show.tasks, show)}>
            <h3 className="cards-list__header">
              Задания<a className="cards-list__button" onClick={() => props.onShowAddTask()}></a>
            </h3>
            {getShowLink(show.tasks, show, props.onShowTasks)}
            {props.projects.showAddTask ? <NewTask id={project.id} /> : ""}
            <Tasks tasks={project.task} />
          </section>
          <section className={getCardsClass(show.inProcess, show)}>
            <h3 className="cards-list__header">В процессе</h3>
            {getShowLink(show.inProcess, show, props.onShowInProcess)}
            <Tasks tasks={project.inProcess} />
          </section>
          <section className={getCardsClass(show.done, show)}>
            <h3 className="cards-list__header">Завершено</h3>
            {getShowLink(show.done, show, props.onShowDone)}
            <Tasks tasks={project.done} />
          </section>
        </section>
      </article>
    );
  }
};
