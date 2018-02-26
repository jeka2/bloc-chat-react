import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);

    this.assignMessage = this.assignMessage.bind(this);

    this.state = {
      message: [],
      messagesToShow: []
    }

    this.messageRef = this.props.firebase.database().ref('credentials');

  }

  componentDidMount() {

    this.messageRef.on('child_added', snapshot => {
      const mssg = snapshot.val();
      this.setState({ message: this.state.message.concat( mssg ) })
    });

  }

assignMessage (e) {
  e.preventDefault();
  if(this.newMessage.value === '') {return}

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date +' '+ time;

  var roomInfo = {
    userName: '',
    content: this.newMessage.value,
    sentAt: dateTime,
    roomId: this.props.keyId
  }

  this.messageRef.push({
    message: roomInfo,
  });
  this.newMessage.value = '';
  this.messageFilter(roomInfo.roomId);
}


messageFilter(roomInfo) {
  var info = [];
  this.messageRef.on("value", function(snapshot) {
    var data = snapshot.val();
    Object.entries(data).forEach(
      ([key, value]) => info.push(value)
    );
  });
  var key = roomInfo;

  for(let i = 0; i < info.length; i++) {
    if(info[i].message.roomId === key) {
        this.setState({messagesToShow: this.state.messagesToShow.push( info[i].message )})
      }
    }
}

render() {

  const isRoomChosen = this.props.keyId !== '';
  return(
  <div>
    <div className="message-bar">
    {isRoomChosen ? (
      <form onSubmit={this.assignMessage}>
      <input type="text" ref={(value) => this.newMessage = value}/>
      <input type="submit" />
      </form>
    ) : (null)}
    </div>
    <div className="message-scroll">
    <ul>
    {isRoomChosen ? (
      this.messageFilter(this.props.keyId)
      this.state.messagesToShow.map( (val,index) => {
        return <li key={index}>{val.name}</li>

      })
    )
    }
    </ul>
    </div>
  </div>
  );
}

}


export default MessageList;
