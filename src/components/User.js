import React, { Component } from 'react';

function LogOutButton(props) {
  return <button onClick={props.onClick}>Log Out</button>;
}

function LogInButton(props) {
  return <button onClick={props.onClick}>Log In</button>;
}


class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      name: ''
    };

    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  //The userName is Sent Down Below to App.js
  //
  //
  //
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }


  handleSignInClick(e) {
    e.preventDefault();
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
    this.setState({loggedIn: true,})
    this.assignName();
    console.log(this.props.user)
  }

  handleSignOutClick(e) {
    e.preventDefault();
    this.props.firebase.auth().signOut();
    this.setState({loggedIn: false,
                   name: ''})
    console.log(this.props.user)
  }

  assignName() {
    if(this.props.user !== null) {
      this.setState({ name: this.props.user.displayName})
    }
  }



  render() {
    let button = <LogInButton onClick={this.handleSignInClick} />
    if(this.state.loggedIn) {
      button = <LogOutButton onClick={this.handleSignOutClick} />
    }
    return(
      <div>
        <div className="User-Name">
        {this.state.name}
        </div>
        {button}
      </div>
    )
  }
}

export default User;
