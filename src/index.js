import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/******************************************************************************
 * -- SQUARE --                                                               *
 *    Functional component for rendering individual squares in a              *
 *    tic-tac-toe game                                                        *
 *****************************************************************************/

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

/*****************************************************************************/

/******************************************************************************
 * -- BOARD --                                                                *
 *    Class for rendering a single tic-tac-toe board                          *
 *****************************************************************************/

class Board extends React.Component {

  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i, this.props.boardNum)}
    />;
  }

  render() {
    return (
        <table class = {this.props.playable}>
          <tr className="board-row">
            <td>{this.renderSquare(0)}</td>
            <td>{this.renderSquare(1)}</td>
            <td>{this.renderSquare(2)}</td>
          </tr>
          <tr className="board-row">
            <td> {this.renderSquare(3)} </td>
            <td>{this.renderSquare(4)}</td>
            <td>{this.renderSquare(5)}</td>
          </tr>
          <tr className="board-row">
            <td>{this.renderSquare(6)}</td>
            <td>{this.renderSquare(7)}</td>
            <td>{this.renderSquare(8)}</td>
          </tr>
        </table>
    );
  }
}

/*****************************************************************************/

/******************************************************************************
 * -- GAME --                                                                 *
 *    Class for rendering and tracking an entire game of 9-board              *
 *****************************************************************************/

class Game extends React.Component {

  // Game constructor keeps track of 9 individual tic-tac-toe games
  constructor(props) {
      super(props);

      var squares = [];
      for (let i = 0; i < 9; i++) {
        squares[i] = Array(9).fill(null);
      }

      this.state = {
        board: squares,
        boardPlayable: Array(9).fill("1"),
        xIsNext: true,
      };
    }

    handleClick(i, boardNum) {
      const board = this.state.board.slice();

      // Do nothing if game is done.
      if (calculateWinner(board[boardNum]) || board[boardNum][i]) {
        return;
      }
      // Do Nothing if board is not proper board to play next move.
      if (!this.state.boardPlayable[boardNum]) {
        return;
      }

      // Otherwise handle normally
      // Set the next playable board:
      var boardP = Array(9).fill(0);
      boardP[i] = "playable";

      board[boardNum][i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: board,
        boardPlayable: boardP,
        xIsNext: !this.state.xIsNext,
      });
    }

  render() {

    const winner = calculateWinner(this.state.board[0]);
    let status;

    // Set status based on whether or not game is over
    if (winner) { status = 'Winner: ' + winner; }
    else { status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');}

    return (
      <div className="game">
        <table class = "center">
          <tr>
            <td className="game-board">
              <Board
                squares={this.state.board[0]}
                onClick={(i, boardNum) => this.handleClick(i, boardNum)}
                boardNum = {0}
                playable = {this.state.boardPlayable[0]}
              />
            </td>
            <td className="game-board">
              <Board
                squares={this.state.board[1]}
                onClick={(i, boardNum) => this.handleClick(i, boardNum)}
                boardNum = {1}
                playable = {this.state.boardPlayable[1]}
              />
            </td>
            <td className="game-board">
              <Board
                squares={this.state.board[2]}
                onClick={(i, boardNum) => this.handleClick(i, boardNum)}
                boardNum = {2}
                playable = {this.state.boardPlayable[2]}
              />
            </td>
          </tr>

          <tr>
            <td className="game-board">
              <Board
                squares={this.state.board[3]}
                onClick={(i, boardNum) => this.handleClick(i, boardNum)}
                boardNum = {3}
                playable = {this.state.boardPlayable[3]}
              />
            </td>
            <td className="game-board">
              <Board
                squares={this.state.board[4]}
                onClick={(i, boardNum) => this.handleClick(i, boardNum)}
                boardNum = {4}
                playable = {this.state.boardPlayable[4]}
              />
            </td>
            <td className="game-board">
              <Board
                squares={this.state.board[5]}
                onClick={(i, boardNum) => this.handleClick(i, boardNum)}
                boardNum = {5}
                playable = {this.state.boardPlayable[5]}
              />
            </td>
          </tr>

          <tr>
            <td className="game-board">
              <Board
                squares={this.state.board[6]}
                onClick={(i, boardNum) => this.handleClick(i, boardNum)}
                boardNum = {6}
                playable = {this.state.boardPlayable[6]}
              />
            </td>
            <td className="game-board">
              <Board
                squares={this.state.board[7]}
                onClick={(i, boardNum) => this.handleClick(i, boardNum)}
                boardNum = {7}
                playable = {this.state.boardPlayable[7]}
              />
            </td>
            <td className="game-board">
              <Board
                squares={this.state.board[8]}
                onClick={(i, boardNum) => this.handleClick(i, boardNum)}
                boardNum = {8}
                playable = {this.state.boardPlayable[8]}
              />
            </td>
          </tr>
        </table>

        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

/*****************************************************************************/

/*****************************************************************************
 * Helper function for checking if an individual board has been won          *
 *****************************************************************************/
function calculateWinner(square) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}

/*****************************************************************************/

/*****************************************************************************/

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
