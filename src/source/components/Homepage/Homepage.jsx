import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Notes from "../../containers/Homepage/Notes";
import LittleNotes from "../../containers/Homepage/Little/Notes";
import New from "../../containers/Homepage/New";
import Menu from "./Menu/Menu";

import "../../styles/Homepage/Homepage.scss";

class Homepage extends Component {
  render() {
    return (
      <>
        <Menu avatar={this.props.accounts.jwt.data.avatar} />
        <Switch>
          <Route path="/projects">
            <Notes />
            <New />
          </Route>
          <Route path="/project/:id">
            <LittleNotes />
          </Route>
        </Switch>
      </>
    );
  }
}

export default Homepage;
