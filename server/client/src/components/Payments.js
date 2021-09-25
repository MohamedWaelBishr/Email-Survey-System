import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Email Survey System"
        description="1 Credit = 1 Survey min[5]"
        image="https://cdn-icons-png.flaticon.com/128/607/607700.png"
        amount={500}
        token={(token) => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        panelLabel="Add 5 Credits For "
      >
        <button className="btn waves-effect waves-light light-green darken-2">
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}
export default connect(null, actions)(Payments);
