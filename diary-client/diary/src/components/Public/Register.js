import React, { Component } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      password2: "",
      message: ""
    };

    this.setName = this.setName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setPassword2 = this.setPassword2.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(event) {
    event.preventDefault();

    fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())

      .then(res => {
        this.setState({ message: res.message });
      })
      .catch(error => console.log(error));
  }

  //chcecking passwords on the server, add it into chectkim empty fields section

  setName(event) {
    this.setState({
      name: event.target.value
    });
  }

  setEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  setPassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  setPassword2(event) {
    this.setState({
      password2: event.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <Link to="/login">
          <p id="back">Back</p>
        </Link>

        <h1>Welcome in register section</h1>

        <div id="formArea">
          <form onSubmit={this.registerUser}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="username"
              onChange={this.setName}
            />

            <br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e-mail"
              onChange={this.setEmail}
            />

            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              onChange={this.setPassword}
            />

            <br />
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="repeat password"
              onChange={this.setPassword2}
            />

            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>

        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
