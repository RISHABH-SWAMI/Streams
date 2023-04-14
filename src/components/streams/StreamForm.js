import React from "react";
import { Field, reduxForm } from "redux-form"; // Field is a component created by 'redux-form'.
// reduxForm is a function that is similar to connect() function. The difference is that instead
// of having different arguements it has an object which has some configuration.

class StreamForm extends React.Component {
  renderError({touched, error}) {
    if(touched && error) {
      return (
        <div className="ui error message">
          <div className="ui header">{error}</div>
        </div>
      )
    }
  }


  renderInput = ({input, label, meta}) => {
    // console.log(input);
    // console.log(label);
    console.log(meta);
    
    const className = `field ${meta.error && meta.touched ? 'error': ''}`
    return (
      <div className={className}>
        {/* Easy way to start and understand 
        <input onChange={arguement.input.onChange}
        value={arguement.input.value}
        />         
      */}

        {/* Refactor way    
        <input {...arguement.input} /> */}

        {/* Destructuring Refactor way 
        renderInput = ({input}) => {..} */}
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    // event.preventDefault();
    console.log(formValues);

    //Anytime the user submits the form I'm make sure that I will call the below statement
    this.props.onSubmit(formValues);
    
  } 
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Title" />
        <Field name="description" component={this.renderInput} label="Description" />
        <button className="ui primary button">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if(!formValues.title) {
    errors.title = 'User must enter a title'
  }

  if(!formValues.description) {
    errors.description = 'User must enter a description about title.'
  }

  return errors;
}

export default reduxForm({
  form: "streamForm",
  // validate: validate
  // Both key and values have same name so we can refactor it by writing only validate
  validate
})(StreamForm);


