import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./Main.css";

import newConfession from "./content/newConfession";
import Account from "./content/account.js";
import OtherConfessions from "./content/otherUsrConfessions";
import publicConfessions from "./content/publicConfessions";
import myConfessions from "./content/myConfessions";
import changeConfession from "./content/changeConfession";

class Main extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.getName = this.getName.bind(this);
    this.state = {
      name: ""
    };
  }

  logOut() {
    localStorage.clear();
    window.location.reload();
  }

  componentDidMount() {
    this.getName();
  }

  getName() {
    fetch("http://localhost:4000/verify", {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("token")
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(res => {
        let newName = res.decoded.name;
        this.setState({ name: newName });
      });
  }

  render() {
    return (
      <div className="App">
        <ul id="NavigationBar">
          <Link to="/home">
            <li>Home</li>
          </Link>
          <Link to="/account">
            <li>My account</li>
          </Link>
          <Link to="/newConfession">
            <li>New Confession</li>
          </Link>
          <Link to="/otherUsersConfessions">
            <li>Other users confessions</li>
          </Link>
          <li id="logOut" onClick={this.logOut}>
            Logout: {this.state.name}
          </li>
        </ul>

        <Route path="/newConfession" component={newConfession} />
        <Route
          path="/account"
          component={(...props) => (
            <Account {...props} onToken={this.getName} />
          )}
        />
        <Route path="/otherUsersConfessions" component={OtherConfessions} />
        <Route path="/publicConfessions" component={publicConfessions} />
        <Route path="/home" component={myConfessions} />
        <Route path="/changeConfession" component={changeConfession} />
      </div>

      //{(...props)=><Account  {...props} onToken={this.getName}> />
    );
  }
}

export default Main;
