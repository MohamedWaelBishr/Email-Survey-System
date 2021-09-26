import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li className="orange darken-4">
            <a
              href="/auth/google"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Sign In With Google
            </a>
          </li>
        );
      default:
        return [
          <li key="0" style={{ marginRight: "5px" }}>
            <Payments />
          </li>,
          <li key="1" style={{ margin: "0 10px", fontWeight: "bold" }}>
            Credits :{this.props.auth.credits}
          </li>,
          <li key="2">
            <Link
              to={this.props.auth ? "/surveys" : "/"}
              href="/"
              style={{ marginLeft: "10px", fontWeight: "bold" }}
            >
              Dashboard
            </Link>
          </li>,
          <li key="3">
            <a
              href="/api/logout"
              className="pink darken-1"
              style={{ fontWeight: "bold" }}
            >
              Sign Out
            </a>
          </li>,
        ];
    }
  }

  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper purple darken-3">
          <Link to="/" className="btn-floating btn-large purple">
            <i className="material-icons">email</i>
          </Link>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);
