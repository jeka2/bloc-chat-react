import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);

    this.assignMessage = this.assignMessage.bind(this);

    this.state = {
      message: [],
    }

    this.messageRef = this.props.firebase.database().ref('credentials');
    console.log(this.messageRef)
    //this.messageRef.push({
      //startedAt: this.firebase.database.ServerValue.TIMESTAMP
    //})
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

  var roomInfo = {
    userName: '',
    content: this.newMessage.value,
    sentAt: /*this.messageRef.startedAt*/'',
    roomId: this.props.keyId
  }

  this.messageRef.push({
    message: roomInfo,
  });

  this.setState({ message: this.state.message.concat( roomInfo )})
  this.newMessage.value = '';
  console.log(this.state)
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
  </div>
  );
}

}


export default MessageList;
