import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


class Board extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
        numOfMoves: 0
      }
  }

  calculateWinner(){
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for(let i = 0; i < winningCombinations.length; i++){
      const [a, b, c] = winningCombinations[i]
      if(this.state.squares[a] && this.state.squares[a] === this.state.squares[b] && this.state.squares[b] === this.state.squares[c]){
        return this.state.squares[a];
      }
    }

    return null;
  }

  handleClick(i){
    const squares = this.state.squares.slice()
    const nextPlayer = this.state.xIsNext ? "X" : "O"
    if(this.calculateWinner()|| this.state.squares[i]){
      return;
    }
    squares[i] = nextPlayer;
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      numOfMoves: this.state.numOfMoves + 1
    })
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
  }

  render() {
    const winner = this.calculateWinner();
    const noWinner = this.state.numOfMoves === 9
    let status = null;
    if(winner){
      status = "Winner: " + winner;
    }
    else if(noWinner){
      status = "No Winners here!";
    }
    else{
      status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

/* class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
} */

function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
