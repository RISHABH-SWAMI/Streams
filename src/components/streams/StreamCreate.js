import React from "react";
// import { Field, reduxForm } from "redux-form"; // Field is a component created by 'redux-form'.
// reduxForm is a function that is similar to connect() function. The difference is that instead
// of having different arguements it has an object which has some configuration.

import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    // event.preventDefault();
    console.log(formValues);

    //Anytime the user submits the form I'm make sure that I will call the below statement
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null, 
  { createStream }
  )(StreamCreate);
