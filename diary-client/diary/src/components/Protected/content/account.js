import React, { Component } from "react";

import "./account.css";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      repeatedPassword: "",
      public: "",
      message: ""
    };
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeRepeatedPassword = this.changeRepeatedPassword.bind(this);
    this.changePublic = this.changePublic.bind(this);
    this.send = this.send.bind(this);
  }

  changeName(event) {
    let newName = event.target.value;
    this.setState({ name: newName });
  }

  changeEmail(event) {
    let newEmail = event.target.value;
    this.setState({ email: newEmail });
  }
  changePassword(event) {
    let newPassword = event.target.value;
    this.setState({ password: newPassword });
  }

  changeRepeatedPassword(event) {
    let newRepeatedPassword = event.target.value;
    this.setState({ repeatedPassword: newRepeatedPassword });
  }

  changePublic(event) {
    let newPublic = event.target.value;
    this.setState({ public: newPublic });
  }

  send() {
    fetch("http://localhost:4000/setNewUserData", {
      method: "POST",
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        repeatedPassword: this.state.repeatedPassword,
        public: this.state.public
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
          localStorage.clear();
          localStorage.setItem("token", res.token);
          this.props.onToken();
          //this.props.history.push("/");
          // this.Main.getName();
        }
      });
  }

  componentDidMount() {
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
        this.setState({
          id: res.decoded.id,
          name: res.decoded.name,
          email: res.decoded.email,
          public: res.decoded.public
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Here you can change your account's data</h1>

        <input
          className="dataFields"
          placeholder="name"
          value={this.state.name}
          onChange={this.changeName}
        />
        <input
          className="dataFields"
          placeholder="email"
          value={this.state.email}
          onChange={this.changeEmail}
        />
        <input
          className="dataFields"
          placeholder="new password"
          value={this.state.password}
          onChange={this.changePassword}
        />
        <input
          className="dataFields"
          placeholder="repeat new password"
          value={this.state.repeatedPassword}
          onChange={this.changeRepeatedPassword}
        />
        <select
          id="selectField"
          value={this.state.public}
          onChange={this.changePublic}
        >
          <option value="false" name="no">
            No
          </option>
          <option value="true" name="yes">
            Yes
          </option>
        </select>
        <br />
        <button id="changeButton" onClick={this.send}>
          Change
        </button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default Account;
