import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../styles/Homepage/Homepage.scss";

class Homepage extends Component {
  render() {
    return (
      <>
        <nav className="left-menu">
          <div
            className="left-menu__avatar"
            style={{
              backgroundImage: `url(${this.props.accounts.jwt.data.avatar ||
                "/static/img/default_avatar.svg"})`
            }}></div>
          <section className="left-menu__links">
            <Link
              to="/profile"
              title="Профиль"
              className="left-menu__links__one-link"
              style={{ backgroundImage: "url(/static/img/profile.svg)" }}>
              <div className="left-menu__links__one-link__submenu">
                <h4 className="left-menu__links__one-link__submenu__title">Профиль</h4>
              </div>
            </Link>
            <Link
              to="/settings"
              title="Настройки"
              className="left-menu__links__one-link"
              style={{ backgroundImage: "url(/static/img/settings.svg)" }}>
              <div className="left-menu__links__one-link__submenu">
                <h4 className="left-menu__links__one-link__submenu__title">Настройки</h4>
              </div>
            </Link>
          </section>
        </nav>
      </>
    );
  }
}

export default Homepage;
