import React, { useEffect, useRef } from "react";

import "../../../styles/Homepage/New.scss";

import resizeTextarea from "../../../scripts/utils/resizeTextarea";

export default props => {
  const textarea = useRef(null);

  useEffect(() => {
    resizeTextarea(textarea.current);
  });

  return (
    <article className="new-project">
      <h3 className="new-project__h3">Создать новый проект</h3>
      <input
        type="text"
        className="new-project__input"
        placeholder="Название проекта"
        onChange={e => props.onInputTitle(e.target.value)}
        value={props.projects.inputProjectTitle}
      />
      <textarea
        className="new-project__textarea"
        placeholder="Описание проекта"
        onChange={e => {
          props.onInputDescription(e.target.value);
        }}
        ref={textarea}
        value={props.projects.inputProjectDescription}></textarea>
      <a
        className="new-project__button"
        onClick={() =>
          props.onCreateProject({
            title: props.projects.inputProjectTitle,
            description: props.projects.inputProjectDescription
          })
        }>
        Создать
      </a>
    </article>
  );
};
