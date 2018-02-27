import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);

    //this.assignMessage = this.assignMessage.bind(this);

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

/*
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
  this.setState({messagesToShow: []});
  this.messageFilter(roomInfo.roomId);
}
*/

messageFilter(roomId) {
  if(this.props.isRoomChosen === false) {return}
  var info = [];
  this.messageRef.on("value", function(snapshot) {
    var data = snapshot.val();
    Object.entries(data).forEach(
      ([key, value]) => info.push(value)
    );
  });
  var key = roomId;

    info.forEach((val,index) => {
      if(val.message.roomId === key) {
        this.updateState(val.message.content)
      }
    })
}

updateState(x) {
  this.setState({ messagesToShow: this.state.messagesToShow.push(x)})
  console.log(this.state.messagesToShow)
}

render() {
  return(
  <div>
    {this.messageFilter(this.props.keyId)}
    <div className="message-bar">

    </div>
    <div className="message-scroll">
    <ul>

        {this.state.messagesToShow.map( (val,index) => {
          return <li key={index}>{val.name}</li>
        })}
    </ul>
    </div>
  </div>
  );
}

}


export default MessageList;
