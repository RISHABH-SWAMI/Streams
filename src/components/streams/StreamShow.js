import React from "react";
import flv from "flv.js"; // flv is about downloading the video stream and then converting it
// to some file that can actually played inside of normal html video player.

// We can almost think of flv.js as being a little bit like axios in that it's going to reach out
// to some remote server and get some resource and then serve up that data to our application to be
//consumed on the screen.
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);
    // Anytime our component first mounted to the screen we are going to call buildPlayer() method.
    this.buildPlayer();
  }

  // componentDidMount is only going to be called one time
  // when the component is first rendered to the screen. 
  
  // Just in case we do not have access to our stream and we are going to try to fetch it on the fly
  // we need to have some place to call build player after we successfully fetch the stream.

  // So now the idea is that  when our component first renders attempt to build the player
  // and if our component fetches the stream successfully at some point in future and the component 
  // re-renders then componentDidUpdate() will be called and we will attempt to call buildPlayer().

  componentDidUpdate() {
    this.buildPlayer();
  }

  // When we get away from the streamShow Component means that we are no longer looking at that
  // video player the videoplayer is still attempting to download and process video and that's 
  // why when we stop our stream we eventually see a message on console that is MediaSource onSourceEnded
  // it's because that video player is still connected to that stream and it was still trying to
  // receive new information.
  
  componentWillUnmount() {
    // It is a method that is used to clean up some resources that is used by the component.
    // console.log('I was unmounted');
    
    //We are going to cleanup this video player resource. So to do so we are going to
    // call this.player.destroy().
    //When we call destroy() method it's going to essentially tell the player that stop 
    //attempting to stream the video or detatch itself from the video element
    this.player.destroy();
  }

  buildPlayer() {
    console.log(this.videoRef.current);
    if (this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
