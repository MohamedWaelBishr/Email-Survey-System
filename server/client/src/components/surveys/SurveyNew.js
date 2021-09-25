// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => {
          this.setState({ showFormReview: true });
        }}
      />
    );
  }

  render() {
    return (
      <div
        className="container"
        style={{ marginTop: "100px", height: "100vh" }}
      >
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
