import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Guestpage from "../containers/Guestpage/Guestpage";
import Homepage from "../containers/Homepage/Homepage";

import "../styles/main.scss";

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route
            path="/"
            component={
              this.props.accounts.jwt.signature && this.props.accounts.jwt.data
                ? Homepage
                : Guestpage
            }
          />
        </Switch>
      </>
    );
  }
}

export default App;
