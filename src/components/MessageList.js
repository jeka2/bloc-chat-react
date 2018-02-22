import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);

    this.assignMessage = this.assignMessage.bind(this)

    this.state = {
      message: '',
      roomId: this.props.id
    }
  }

assignMessage (e) {
  e.preventDefault();
  this.setState({message: this.newMessage.value})
  console.log(this.state)
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
