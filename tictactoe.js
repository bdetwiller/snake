// function Player(symbol) {
//   this.symbol = symbol;
// };

// function Board() {
//   this.grid = new Array([new Array(3)], [new Array(3)], [new Array(3)]);

//   this.validMove = function(row, col) {
//     if (this.grid[row][col] === undefined) {
//       return true;
//     }
//     return false;
//   };

//   this.move = function(symbol, row, col) {
//     this.grid[row][col] = symbol;
//   };

//   this.win = function(symbol) {
//     for(i = 0, i < this.winCombos.length; i++) {
//       var checkArray = this.winCombos[i];
//       if (this.grid[checkArray[0][0]][checkArray[0][1]] === symbol &&
//         this.grid[checkArray[1][0]][checkArray[1][1]] === symbol &&
//         this.grid[checkArray[2][0]][checkArray[2][1]] === symbol) {
//           return true;
//       }
//     }
//     return false;
//   };

//   this.winCombos = [ [[0,0],[0,1],[0,2]], [[1,0],[1,1],[1,2]], [[2,0],[2,1],[2,2]],
//   [[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]], [[0,0],[1,1],[2,2]],
//   [[0,2],[1,1],[2,0]] ];
// };


var createLines = function() {
  lines = [];

  for(var i = 0; i < 3; i++){
    line1 = []
    line2 = []
    for(var j = 0; j < 3; j++){
      line1.push([i,j]); // horizontal line
      line2.push([j,i]); // it's corresponding transpose/vertical line
    }
    lines.push(line1);
    lines.push(line2);
  }

  lines.push([[0,0],[1,1],[2,2]]); // add dem diags.
  lines.push([[0,2],[1,1],[2,0]]);
  return lines;
};

var Board = function() {
  var grid = _.times(3, function() {return Array(3);});
  this.grid = grid;
  this.lines = createLines();
  this.winCombos = [ [[0,0],[0,1],[0,2]], [[1,0],[1,1],[1,2]], [[2,0],[2,1],[2,2]],
  [[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]], [[0,0],[1,1],[2,2]],
  [[0,2],[1,1],[2,0]] ];
};

var Game = function() {
  this.board = new Board();
  this.currentPlayer = 'x';
};

Board.prototype.over = function() {
  winningLines = _.filter(this.lines, function(line){
    return checkLine(line);
  });
  if (winningLines.length > 0 ) {
    return true;
  }
  return false;
};

Board.prototype.win = function(symbol) {
  for(i = 0; i < this.winCombos.length; i++) {
    var checkArray = this.winCombos[i];
    if (this.grid[checkArray[0][0]][checkArray[0][1]] === symbol &&
      this.grid[checkArray[1][0]][checkArray[1][1]] === symbol &&
      this.grid[checkArray[2][0]][checkArray[2][1]] === symbol) {
        return true;
    }
  }
  return false;
};

Board.prototype.checkLine = function(line) {
  values = _.map(line, function(pos) {
    return this.grid[pos[0]][pos[1]];
  });

  if(values[0] == '' || values[1] == '' || values[2] == ''){
    return false;
  }
  return (values[0] == values[1] && values[1] == values[2]);
};

Board.prototype.validMove = function(move) {
  return !this.grid[move[0]][move[1]];
};

Board.prototype.placePiece = function(move, player) {
  this.grid[move[0]][move[1]] = player;
};

Game.prototype.move = function(move) {
  if (this.board.validMove(move)) {
    this.board.placePiece(move,this.currentPlayer);
    this.currentPlayer = (this.currentPlayer == 'x') ? 'o' : 'x';
    return true;
  }
  return false;
}

var render = function(board) {
  $('.game').empty();
  for (var i = 0; i < board.grid.length; i++) {
    for (var j = 0; j < 3; j++) {
      console.log('<div class="container" id="' + i + j + '"></div>');
      $('.game').append('<div class="container" id="' + i + j + '"></div>');
      if(board.grid[i][j] != undefined) {
        $('#' + i + j).append('<p class="symbol">' + board.grid[i][j] + '</p>');
      }
    }
  }
};

var makeMove = function(game, str){
  position = [parseInt(str[0]), parseInt(str[1])];
  if(game.board.validMove(position)){
    game.move(position);
    var checkWinPlayer = ((game.currentPlayer == 'x') ? 'o' : 'x');
    console.log("check win:" + checkWinPlayer);
    if(game.board.win(checkWinPlayer)){
      $('p').append(checkWinPlayer + " wins!!");
    }
  }
};

  $(document).ready(function(){
  var game = new Game();

  render(game.board);

  $('.game').on('click', '.container', function(){
    makeMove(game, $(this).attr('id'));
    render(game.board);
  });

$('#reset-button').click(function(){
    game = new Game();
    render(game.board);
    $('p').empty();
  });

});