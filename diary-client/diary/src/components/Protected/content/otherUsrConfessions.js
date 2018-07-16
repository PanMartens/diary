import React, { Component } from "react";
import "./otherUsrConfessions.css";
import { Link } from "react-router-dom";
class OtherConfessions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUsers: ""
    };
  }

  componentWillMount() {
    fetch("http://localhost:4000/getOtherUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          listUsers: res.rows.map((el, index) => (
            <Link key={index} to={`/publicConfessions/${el.name}`}>
              <li className="elementPublicUser" name={el.id} key={index}>
                {el.name}
              </li>
            </Link>
          ))
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Here you can read public Confessions</h1>
        <ul id="listPublicUsers">{this.state.listUsers}</ul>
      </div>
    );
  }
}

export default OtherConfessions;
