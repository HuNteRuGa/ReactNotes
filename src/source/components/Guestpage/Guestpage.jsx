import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import Signin from "../../containers/Guestpage/Signin";
import Signup from "../../containers/Guestpage/Signup";

import "../../styles/Guestpage/Guestpage.scss";

class Guestpage extends Component {
  render() {
    return (
      <>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/">
          <div className="guestpage-container">
            <header className="guestpage-header">
              <h1 className="guestpage-header__h1">ReactNote</h1>
              <h2 className="guestpage-header__h2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, consequatur!
              </h2>
            </header>
            <aside className="guestpage-signin">
              <h3 className="guestpage-signin__h3">Войти в аккаунт</h3>
              <div className="guestpage-signin__container">
                <input
                  className="guestpage-signin__container__input"
                  type="text"
                  value={this.props.accounts.signinUsername}
                  onChange={e => this.props.onInputSigninUsername(e.target.value)}
                  placeholder="Имя пользователя"
                />
              </div>
              <div className="guestpage-signin__container">
                <input
                  className="guestpage-signin__container__input"
                  type="password"
                  value={this.props.accounts.signinPassword}
                  onChange={e => this.props.onInputSigninPassword(e.target.value)}
                  placeholder="Пароль"
                />
              </div>
              <input
                className="guestpage-signin__button"
                type="submit"
                onClick={() =>
                  this.props.onSignin({
                    username: this.props.accounts.signinUsername,
                    password: this.props.accounts.signinPassword
                  })
                }
                value="Войти"
              />
              <div className="guestpage-signin__text">
                Вы можете{" "}
                <Link className="guestpage-signin__text__link" to="/signup">
                  зарегестрироваться
                </Link>
                , если у вас еще нет аккаунта
              </div>
            </aside>
          </div>
        </Route>
      </>
    );
  }
}

export default Guestpage;
