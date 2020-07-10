import React from "react";
import ReactDOM from 'react-dom';
import Button from './components/Button';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return (
      <React.Fragment>
        <button onClick={() => this.setState({ liked: true })}>Like</button>
        <Button></Button>
      </React.Fragment>

    );

  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
