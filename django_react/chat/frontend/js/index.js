import React from "react";
import ReactDOM from 'react-dom';
import { Button, DatePicker, version } from "antd";
import "antd/dist/antd.css";

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
        <Button onClick={() => this.setState({ liked: true })} type="ghost">
          Like
        </Button>
        <DatePicker />
      </React.Fragment>

    );

  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
