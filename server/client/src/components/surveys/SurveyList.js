import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map((survey) => {
      return (
        <div className="Horizontal card purple lighten-4" key={survey._id}>
          <div className="card-content">
            <span className="card-title " style={{ fontWeight: "bold" }}>
              {survey.title}
            </span>
            <p style={{ fontWeight: "bold" }}>{survey.body}</p>
          </div>
          <div className="card-action" style={{ fontWeight: "bold" }}>
            <a style={{ color: "purple" }}>Yes [ {survey.yes} ] </a>
            <a style={{ color: "purple" }}>No [ {survey.no} ] </a>
            <p className="right" style={{ fontWeight: "bold" }}>
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="center">
          <h2>Here is your previous surveys</h2>
        </div>
        <div>{this.renderSurveys()}</div>
      </div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
