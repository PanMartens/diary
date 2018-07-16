import React, { Component } from "react";
import CKEditor from "react-ckeditor-component";
///import { Route, Link } from "react-router-dom";
import "./newConfession.css";
class newConfession extends Component {
  constructor(props) {
    super(props);

    this.addConfession = this.addConfession.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.state = {
      data: "",
      IdUser: "",
      title: "",
      message: ""
    };
  }

  onDataChange(event) {
    let content = event.editor.getData();
    this.setState({ data: content });
  }

  onTitleChange(event) {
    let newTitle = event.target.value;
    this.setState({ title: newTitle });
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
        let id = res.decoded.id;
        this.setState({ IdUser: id });
      });
  }

  addConfession() {
    //
    fetch("http://localhost:4000/newConfession", {
      method: "POST",
      body: JSON.stringify({
        owner_id: this.state.IdUser,
        title: this.state.title,
        data: this.state.data
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ message: res.message });
      });
  }

  render() {
    return (
      <div>
        <h1>Here you can create new notes</h1>
        <input
          id="title"
          onChange={this.onTitleChange}
          placeholder="Title"
        />{" "}
        <br />
        <CKEditor
          activeClass="ckeditor"
          config={{
            height: "400px",
            contentsCss: ["body {font-size: 20px;}"]
          }}
          events={{
            change: this.onDataChange
          }}
        />
        <button id="addButton" onClick={this.addConfession}>
          Add
        </button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}
export default newConfession;
