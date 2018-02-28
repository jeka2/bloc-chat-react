import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import './App.css';
import * as firebase from 'firebase';

  var config = {
    apiKey: "AIzaSyDD9YkAgt9Q63JP_rhIoFbDYNqH86tQY6E",
    authDomain: "bloc-chat-react-7ed45.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-7ed45.firebaseio.com",
    projectId: "bloc-chat-react-7ed45",
    storageBucket: "bloc-chat-react-7ed45.appspot.com",
    messagingSenderId: "981516815952"
  };
  firebase.initializeApp(config);

//COmment
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      key: '',
      user: '',

    }
  }

  getData(val) {
    this.setState({ key: val,})
  }

  setUserData(userInfo) {
    this.setState({ user: userInfo, });
  }

  render() {
    return (
      <div className="App">
        <User firebase={firebase} setUser={this.setUserData.bind(this)} user={this.state.user}/>
        <RoomList firebase={firebase} sendData={this.getData.bind(this)}/>
        <MessageList firebase={firebase} roomChosen={this.state.roomChosen} keyId={this.state.key}/>
      </div>
    );
  }
}

export default App;
