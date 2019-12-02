import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import Guestpage from "./Guestpage/Guestpage";
import Homepage from "./Homepage/Homepage";

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={Guestpage} />
          <Route path="/homepage" component={Homepage} />
        </Switch>
        <h4>Pages:</h4>
        <nav style={{ display: "flex", flexDirection: "column" }}>
          <Link to="/">Guest</Link>
          <Link to="/homepage">Home</Link>
        </nav>
      </>
    );
  }
}

export default App;
