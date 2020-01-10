import React from "react";

import resizeTextarea from "../../../../scripts/utils/resizeTextarea";

export default props => {
  const getCardClass = show => {
    return `project-list__card project-card${show ? " project-card--visible" : ""}`;
  };

  return (
    <section className={getCardClass(props.projects.showTasks)}>
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
        <a
          className="project-card__button-add"
          onClick={() =>
            props.onAddTask({
              title: props.projects.inputTaskTitle,
              description: props.projects.inputTaskDescription,
              project_id: props.id
            })
          }>
          Добавить
        </a>
        <a className="project-card__button-hide" onClick={() => props.onHideAddTask()}>
          Скрыть
        </a>
      </div>
    </section>
  );
};
