import React from 'react';
import './App.css';


function LoginComponent(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  render() {
    return (
      <div>
        <div className="login">
          <LoginComponent />
        </div>
        <div>
          <div>发现音乐</div>
          <div>私人 FM</div>
          <div>视频</div>
          <div>朋友</div>
        </div>
      </div>
    )
  }
}

class app extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Layout />
        </div>
      </div>
    );
  }
}

export default app;
