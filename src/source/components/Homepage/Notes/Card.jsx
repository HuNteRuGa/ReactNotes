import React from "react";

export default props => {
  return (
    <div className="project-cards__one-card one-card">
      <div className="one-card__header">{props.title}</div>
      {props.tasks.map((value, index) => {
        return (
          <div className="one-card__task" key={index}>
            {value.length > 11 ? `${value.substr(0, 10)}...` : value}
          </div>
        );
      })}
    </div>
  );
};
