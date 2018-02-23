import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);

    this.assignMessage = this.assignMessage.bind(this)

    this.state = {
      message: [],
    }

    this.messageRef = this.props.firebase.database().ref('credentials');
  }

  componentDidMount() {

    
    this.messageRef.on('child_added', snapshot => {
      const mssg = snapshot.val();
      this.setState({ message: this.state.message.concat( mssg ) })
      console.log(mssg)
    });

  }

assignMessage (e) {
  e.preventDefault();
  if(this.newMessage.value === '') {return}
  this.messageRef.push({

  });
  this.newMessage.value = '';
  console.log(this.state.rooms)
}

render() {
  return(
  <div>
    <div className="message-bar">
      <form onSubmit={this.assignMessage}>
      <input type="text" ref={(value) => this.newMessage = value}/>
      <input type="submit" />
      </form>

    </div>
  </div>
  );
}

}


export default MessageList;
