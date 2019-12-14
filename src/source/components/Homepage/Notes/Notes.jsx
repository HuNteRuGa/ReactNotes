import React from "react";

import Project from "./Project";

export default props => {
  return (
    <article className="project-list">
      <h1 className="project-list__h1">Проекты</h1>
      <Project
        tasks={["Купить слона", "Построить замок в майнкрафте"]}
        process={["Накопать стак алмазов в майнкрафе", "Сделать ребенка"]}
        done={["Скачать манйкрафт"]}
      />
      <Project
        tasks={["Купить слона", "Построить замок в майнкрафте"]}
        process={["Накопать стак алмазов в майнкрафе", "Сделать ребенка"]}
        done={["Скачать манйкрафт"]}
      />
      <Project
        tasks={["Купить слона", "Построить замок в майнкрафте"]}
        process={["Накопать стак алмазов в майнкрафе", "Сделать ребенка"]}
        done={["Скачать манйкрафт"]}
      />
    </article>
  );
};
