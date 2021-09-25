// SurveyFormReview shows users their form inputs for review
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import FormFields from "./FormFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(FormFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label style={{ fontWeight: "bold" }}>{label}</label>
        <div style={{ fontWeight: "bold", color: "purple" }}>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="red darken-3 white-text btn-flat"
        onClick={onCancel}
        style={{ marginTop: "40px" }}
      >
        Back
      </button>
      <button
        onClick={() => {
          submitSurvey(formValues, history);
        }}
        className="green btn-flat right white-text"
        style={{ marginTop: "40px" }}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
