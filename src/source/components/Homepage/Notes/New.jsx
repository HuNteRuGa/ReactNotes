import React from "react";

import "../../../styles/Homepage/New.scss";

export default props => {
  return (
    <article className="new-project">
      <h3 class="new-project__h3">Создать новый проект</h3>
      <input type="text" className="new-project__input" placeholder="Название проекта" />
      <textarea className="new-project__textarea" placeholder="Описание проекта"></textarea>
      <input type="submit" className="new-project__button" value="Создать" />
    </article>
  );
};
