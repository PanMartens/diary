import React, { Component } from "react";
import CKEditor from "react-ckeditor-component";
///import { Route, Link } from "react-router-dom";
import "./changeConfession.css";
class changeConfession extends Component {
  constructor(props) {
    super(props);
    this.Id_confession = this.props.location.state.IdConfession;
    this.data_confession = this.props.location.state.data_confession;
    this.title_confession = this.props.location.state.title_confession;

    this.changeConfession = this.changeConfession.bind(this);
    this.deleteConfession = this.deleteConfession.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.state = {
      data: this.data_confession,
      IdUser: "",
      title: this.title_confession,
      IdConfession: this.Id_confession
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

  componentWillMount() {
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

  changeConfession() {
    fetch("http://localhost:4000/changeConfession", {
      method: "POST",
      body: JSON.stringify({
        id_confession: this.state.IdConfession,
        title: this.state.title,
        data: this.state.data
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }).then(this.props.history.push("/home"));
  }

  deleteConfession() {
    fetch("http://localhost:4000/deleteConfession", {
      method: "POST",
      body: JSON.stringify({
        id_confession: this.state.IdConfession
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }).then(this.props.history.push("/home"));
  }

  render() {
    return (
      <div>
        <h1>Here you can change/delete your notes</h1>
        <input
          id="title"
          onChange={this.onTitleChange}
          placeholder="Title"
          value={this.state.title}
        />
        <br />
        <CKEditor
          activeClass="ckeditor"
          content={this.state.data}
          config={{
            height: "400px",
            contentsCss: ["body {font-size: 20px;}"]
          }}
          events={{
            change: this.onDataChange
          }}
        />
        <button id="changeButton" onClick={this.changeConfession}>
          Change
        </button>
        <button id="deleteButton" onClick={this.deleteConfession}>
          Delete
        </button>
      </div>
    );
  }
}

export default changeConfession;
