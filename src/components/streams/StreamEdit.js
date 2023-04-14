import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from "lodash"; 


class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
    // console.log(formValues);
  }

  render() {
    // props is automatically provided by react-router-dom to streamEdit because we are using route and react-router-dom.
    console.log(this.props);
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm 
        // initialValues={this.props.stream} Picking all the values of an object.
        initialValues={_.pick(this.props.stream, 'title', 'description')} //pick is a lodash function that is used to choose properties in a customizable way from an object.
        onSubmit={this.onSubmit} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
