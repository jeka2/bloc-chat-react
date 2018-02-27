import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
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
      roomChosen: false
    }
  }

  getData(val) {
    this.setState({ key: val,
                    roomChosen: true})
  }

  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} sendData={this.getData.bind(this)}/>
        <MessageList firebase={firebase} isRoomChose={this.state.roomChosen} keyId={this.state.key}/>
      </div>
    );
  }
}

export default App;
