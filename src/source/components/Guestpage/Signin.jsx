import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../styles/Guestpage/Signin.scss";

class Signin extends Component {
  render() {
    return (
      <article className="signin">
        <section className="signin__section">
          <h3 className="signin__section__h3">Войти в аккаунт</h3>
          <div className="signin__section__container">
            <input
              type="text"
              className="signin__section__container__input"
              value={this.props.accounts.signinUsername}
              onChange={e => this.props.onInputSigninUsername(e.target.value)}
              placeholder="Имя пользователя"
              name="react-media-username"
            />
            {this.props.accounts.signinError == -1 || this.props.accounts.signinError == -3 ? (
              <div className="signin__section__container__error">
                <div className="signin__section__container__error__content">
                  {this.props.accounts.signinError == -1
                    ? "Введите имя пользователя"
                    : "Имя пользователя или пароль введены неверно"}
                </div>
              </div>
            ) : null}
          </div>
          <div className="signin__section__container">
            <input
              type="password"
              className="signin__section__container__input"
              value={this.props.accounts.signinPassword}
              onChange={e => this.props.onInputSigninPassword(e.target.value)}
              placeholder="Пароль"
              name="react-media-password"
            />
            {this.props.accounts.signinError == -2 ? (
              <div className="signin__section__container__error">
                <div className="signin__section__container__error__content">Введите пароль</div>
              </div>
            ) : null}
          </div>
          <input
            type="submit"
            className="signin__section__button"
            onClick={() =>
              this.props.onSignin({
                username: this.props.accounts.signinUsername,
                password: this.props.accounts.signinPassword
              })
            }
            value="Войти"
          />
          <div className="signin__section__text">
            Вы можете{" "}
            <Link className="signin__section__text__link" to="/signup">
              зарегестрироваться
            </Link>
            , если у вас еще нет аккаунта
          </div>
        </section>
      </article>
    );
  }
}

export default Signin;
