import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class App extends Component {
  constructor(props) {
    super(props);
    this.sendUserData = this.sendUserData.bind(this);
    this.setUserName = this.setUserName.bind(this);
    this.setUserPassword = this.setUserPassword.bind(this);
    this.state = {
      message: "",
      name: "",
      password: ""
    };
  }

  sendUserData(event) {
    event.preventDefault();

    fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())

      .then(res => {
        if (res.message) {
          this.setState({ message: res.message });
        } else {
          //breate token

          localStorage.setItem("token", res.token);
          this.props.history.push("/home");
        }
      })
      .catch(err => {});
  }

  setUserName(event) {
    this.setState({
      name: event.target.value
    });
  }

  setUserPassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome in the diary</h1>
        <h2>Let's log in</h2>

        <div id="formArea">
          <form onSubmit={this.sendUserData}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="username"
              onChange={this.setUserName}
            />{" "}
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              onChange={this.setUserPassword}
            />{" "}
            <br />
            <input type="submit" id="submit" value="Submit" />
          </form>
        </div>

        <p>
          If you don't have account. You can create it in the Register section
        </p>
        <Link to="/register">
          <button id="Register">Register</button>
        </Link>

        <p>{this.state.message}</p>
      </div>
    );
  }
}

// export default withRouter(App);
// export withCookies(App);
const AppComponent = withRouter(App);
export default AppComponent;
