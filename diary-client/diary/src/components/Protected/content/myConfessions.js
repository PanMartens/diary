import React from "react";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import "./myConfessions.css";

class myConfessions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Id_user: "",
      confessions: <li id="withoutHover">You don't have any confession yet</li>
    };
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
        let Id_LoggedUser = res.decoded.id;

        this.setState({ Id_user: Id_LoggedUser }, () => {
          fetch("http://localhost:4000/myConfessions", {
            method: "POST",
            body: JSON.stringify({
              Id_user: this.state.Id_user
            }),
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          })
            .then(res => res.json())
            .then(res => {
              if (res.rows.length > 0) {
                let confessions = res.rows.map((el, index) => (
                  <Link
                    key={index}
                    to={{
                      pathname: `/changeConfession`,
                      state: {
                        IdConfession: el.id_confession,
                        title_confession: el.title,
                        data_confession: el.data
                      }
                    }}
                  >
                    <li className="confessionRows" key={el.id_confession}>
                      {ReactHtmlParser(el.title + "</br></br>" + el.data)}
                    </li>
                  </Link>
                ));

                this.setState({ confession: confessions });
              } else {
                this.setState({
                  confession: (
                    <li id="withoutHover">You don't have any confession yet</li>
                  )
                });
              }
            });
        });
      });
  }

  render() {
    return (
      <div>
        <ul id="confessionsTables">{this.state.confession}</ul>
      </div>
    );
  }
}

export default myConfessions;
