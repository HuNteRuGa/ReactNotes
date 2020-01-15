import React from "react";

export default props => {
  const getTitle = title => (title.length > 11 ? `${title.substr(0, 10)}...` : title);
  return (
    <div className="project-cards__one-card one-card">
      <div className="one-card__header">{props.title}</div>
      {props.tasks.map((value, index) => {
        return (
          <div key={index} className="one-card__task">
            {getTitle(value.title)}
          </div>
        );
      })}
    </div>
  );
};
