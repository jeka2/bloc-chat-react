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

  this.setState({ message: this.state.message.concat( roomInfo )})
  this.newMessage.value = '';
  this.messageFilter();
}

messageFilter() {
  var key = this.props.keyId;
  var messages = this.state.message;
  var filteredArray = fil(messages)
  console.log(messages[0].roomId)

  function fil(messages, key){
    var arr = [];
    for(let i = 0; i < messages.length; i++) {

    }
  }
}

render() {

  const isRoomChosen = this.props.keyId !== '';
  return(
  <div>
    <div className="message-bar">
    {isRoomChosen ? (
      <form onSubmit={this.assignMessage.bind(this)}>
      <input type="text" ref={(value) => this.newMessage = value}/>
      <input type="submit" />
      </form>
    ) : (null)}
    </div>
    <div className="message-scroll">
    <ul>

    </ul>
    </div>
  </div>
  );
}

}


export default MessageList;
