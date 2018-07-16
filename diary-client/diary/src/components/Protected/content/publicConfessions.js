import React from "react";
import ReactHtmlParser from "react-html-parser";
import "./publicConfessions.css";

class PublicConfessions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      confessions: <li>This user is public but doesn't have any confession</li>
    };
  }

  componentWillMount() {
    let adres = window.location.href;

    let splittedAdress = adres.split(`/`);

    this.setState({ name: splittedAdress[splittedAdress.length - 1] }, () => {
      fetch("http://localhost:4000/checkPublic", {
        method: "POST",
        body: JSON.stringify({
          name: this.state.name
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
        .then(res => res.json())
        .then(res => {
          if (res.isNotPublic) {
            this.setState({
              confession: <li>This user don't have public account</li> //TU
            });
          } else {
            let confessions = res.rows.map((el, index) => (
              <li className="confessionRow" key={index}>
                {ReactHtmlParser(el.title + "</br></br>" + el.data)}
              </li> //TU return confession(el.data, index)
            ));

            this.setState({ confession: confessions });
          }
        });
    });
  }

  render() {
    return (
      <div>
        <ul id="confessionsTable">{this.state.confession}</ul>
      </div>
    );
  }
}

// const confession = (text, id) => {
//   return <li key={id}>{text}</li>;
// };

export default PublicConfessions;
