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

handleClick(index) {
  console.log(this.state.rooms)
  this.props.sendData(this.state.rooms[index].name)
}

render() {
    return (
      <div>
      <h3><p>Create a room or enter an existing one</p></h3>
      {/*BEGIN -- capture form input */}
      <form onSubmit={this.createRoom}>
        <input type="text" ref={(value) => this.newRoom = value}/>
        <input type="submit" value="Create Room"/>
      </form>
      {/*END -- capture form input */}
      <div className="room-list">
        <ul>
          {
            this.state.rooms.map( (val,index) => {
              return <li key={index} onClick={() => this.handleClick(index)}>{val.name}</li>

            })
          }
        </ul>
      </div>
    </div>
    );
  }
}

export default RoomList;
