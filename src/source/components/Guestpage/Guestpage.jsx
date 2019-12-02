import React, { Component } from "react";

import Signin from "../../containers/Guestpage/Signin";

class Guestpage extends Component {
  render() {
    return (
      <>
        <header className="header">
          <h2>Welcome to</h2>
          <h1>ReactMedia</h1>
        </header>
        <Signin />
      </>
    );
  }
}

export default Guestpage;
