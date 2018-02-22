import React, { Component } from 'react';
import MessageList from './MessageList'

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.createRoom = this.createRoom.bind(this);

    this.state = {
      rooms: [],

    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

componentDidMount() {

  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })
  });

}

createRoom(e) {
  e.preventDefault();
  if(this.newRoom.value === '') {return}
  this.roomsRef.push({
    name: this.newRoom.value
  });
  this.newRoom.value = '';
  console.log(this.state.rooms)
}

render() {
  /*this.state.rooms.map( (val,index) => {
    console.log(val.name);
  });*/
    return (
      <div>
      {/*BEGIN -- capture form input */}
      <form onSubmit={this.createRoom}>
        <input type="text" ref={(value) => this.newRoom = value}/>
        <input type="submit" />
      </form>
      {/*END -- capture form input */}
      <div className="room-list">
        <ul>
          {
            this.state.rooms.map( (val,index) => {
              return <li key={index}>{val.name}</li>

            })
          }
        </ul>
      </div>
      <MessageList id={this.state.rooms.key} />
      </div>
    );
  }
}

export default RoomList;
