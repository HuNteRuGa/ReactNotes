import React from "react";

import Link from "./Link";

export default props => {
  return (
    <nav className="left-menu">
      <div
        className="left-menu__avatar"
        style={{
          backgroundImage: `url(${props.avatar ||
            "/static/img/default_avatar.svg"})`
        }}></div>
      <section className="left-menu__links">
        <Link title="Заметки" url="/notes" image="/static/img/notes.svg" />
        <Link title="Профиль" url="/profile" image="/static/img/profile.svg" />
        <Link title="Настройки" url="/settings" image="/static/img/settings.svg" />
      </section>
    </nav>
  );
};
