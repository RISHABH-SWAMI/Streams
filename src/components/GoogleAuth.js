import React from "react";
import { signIn, signOut } from "../actions";
import { connect } from "react-redux";

class GoogleAuth extends React.Component {
  //When our application first loads up, We do not know that user is signed in or not.
  //So we probably should not print anything on the screen at that point in time.
  // state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1098074743595-q9ahbc53aqslce869catq1n91g20hoqe.apps.googleusercontent.com",
          scope: "email",
          plugin_name: "http://localhost:3000",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          //Using state level components
          //Showing Authentication status on the screen.
          // this.setState({ isSignedIn: this.auth.isSignedIn.get() });

          // With Redux updating the authentication status
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    //We have to update the state according to authentication status
    //without refreshing the page.

    // this.setState({ isSignedIn: this.auth.isSignedIn.get() });

    // we don't have to fetch isSignedIn.get() from auth object,
    // Instead of doing this we receive an arguement that has boolean value
    // which returns true or false.

    if (isSignedIn) {
      return this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      return this.props.signOut();
    }
  };

  signInOnClick = () => {
    return this.auth.signIn();
  };

  signOutOnClick = () => {
    return this.auth.signOut();
  };

  //Helper method
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    }
    //(this.state.isSignedIn === true) == (this.state.isSignedIn)
    else if (this.props.isSignedIn === true) {
      return (
        <button
          className="ui red google button"
          // We do not include () after referencing the signIn and signOut methods inside button element,
          // Because do not want to call these methods instantly when the component is rendered
          // to the screen, Instead we want to call these methods at some point in time.
          onClick={this.signOutOnClick}
        >
          <i className="google icon"></i>
          Sign out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.signInOnClick}>
          <i className="google icon"></i>
          Sign in with Google
        </button>
      );
    }
  }

  render() {
    //Referencing Helper method inside the render method of the class based component.
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);
