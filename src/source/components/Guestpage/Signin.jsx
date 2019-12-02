import React, { Component } from "react";

class Signin extends Component {
  render() {
    return (
      <section className="signin">
        <input
          type="text"
          className="signin__username"
          value={this.props.accounts.signinUsername}
          onChange={e => this.props.onInputSigninUsername(e.target.value)}
        />
        <input
          type="text"
          className="signin__password"
          value={this.props.accounts.signinPassword}
          onChange={e => this.props.onInputSiginPassword(e.target.value)}
        />
        <input type="submit" className="signin_button" ы/>
      </section>
    );
  }
}

export default Signin;
