import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../styles/Guestpage/Signup.scss";

class Signin extends Component {
  render() {
    return (
      <article className="signup">
        <section className="signup__section">
          <h3 className="signup__section__h3">Регистрация</h3>
          <div className="signup__section__container">
            <input
              type="text"
              className="signup__section__container__input"
              value={this.props.accounts.signupUsername}
              onChange={e => this.props.onInputSignupUsername(e.target.value)}
              placeholder="Имя пользователя"
              name="react-media-username"
            />
            {this.props.accounts.signupError == -1 || this.props.accounts.signupError == -4 ? (
              <div className="signup__section__container__error">
                <div className="signup__section__container__error__content">
                  {this.props.accounts.signupError == -1
                    ? "Имя пользователя должно быть от 2 до 30 символов"
                    : "Введенное имя пользователя уже занято"}
                </div>
              </div>
            ) : null}
          </div>
          <div className="signup__section__container">
            <input
              type="password"
              className="signup__section__container__input"
              value={this.props.accounts.signupPassword}
              onChange={e => this.props.onInputSignupPassword(e.target.value)}
              placeholder="Пароль"
              name="react-media-password"
            />
            {this.props.accounts.signupError == -2 ? (
              <div className="signup__section__container__error">
                <div className="signup__section__container__error__content">
                  Пароль должен быть не короче 6 символов
                </div>
              </div>
            ) : null}
          </div>
          <div className="signup__section__container">
            <input
              type="password"
              className="signup__section__container__input"
              value={this.props.accounts.signupRepeatPassword}
              onChange={e => this.props.onInputSignupRepeatPassword(e.target.value)}
              placeholder="Повторите пароль"
              name="react-media-repeat-password"
            />
            {this.props.accounts.signupError == -3 ? (
              <div className="signup__section__container__error">
                <div className="signup__section__container__error__content">
                  Пароли не совпадают
                </div>
              </div>
            ) : null}
          </div>
          <input
            type="submit"
            className="signup__section__button"
            onClick={() =>
              this.props.onSignup({
                username: this.props.accounts.signupUsername,
                password: this.props.accounts.signupPassword,
                repeatPassword: this.props.accounts.signupRepeatPassword
              })
            }
            value="Зарегестрироваться"
          />
          <div className="signup__section__text">
            Вы можете{" "}
            <Link className="signup__section__text__link" to="/signin">
              войти
            </Link>
            , если у вас уже есть аккаунт
          </div>
        </section>
      </article>
    );
  }
}

export default Signin;
