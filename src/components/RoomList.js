import React, { Component } from 'react';

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
    console.log(room)
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })
  });

}

createRoom(e) {
  e.preventDefault();
  this.roomsRef.push({
    name: this.newRoom.value
  });
  this.newRoom.value = '';
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
      </div>
    );
  }
}

export default RoomList;
