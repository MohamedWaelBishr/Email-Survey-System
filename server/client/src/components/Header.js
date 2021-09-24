import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li className="purple lighten-5">
            <a
              href="/auth/google"
              style={{ color: "#e64a19", fontWeight: "bold" }}
            >
              Sign In With Google
            </a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout" className="pink darken-1">
              Sign Out
            </a>
          </li>
        );
    }
  }

  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper purple darken-3">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            href="/"
            className="brand-logo "
            style={{ marginLeft: "10px" }}
          >
            Email Survey System
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
