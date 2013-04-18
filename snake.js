var Board = function(size){
	this.grid = _.times(size, function() {return Array(size);});
	for(var i = 0; i < size; i++){
		for(var j = 0; j < size; j++){
			this.grid[i][j] = ' ';
		}
	}
	this.size = size;
	this.grid[5][5] = 'X';
	this.validMove = function(move) { 
		return(this.grid[move[0]][move[1]] != "S" || (move[0] > 0 && move[0] < size) || 
			(move[1] > 0 && move[1] < size))
	};

	this.makeMove = function(move) {
		this.grid[move[0]][move[1]] = "S";
	};

	this.makeApple = function() {
		while(true) {
			var x = Math.floor(Math.random() * size);
			var y = Math.floor(Math.random() * size);
			if (this.grid[x][y] === undefined) {
				this.grid[x][y] = "A";
				break;
			}
		}
	};

};

var Snake = function() {
	this.upVector = [1,0];
	this.downVector = [-1,0];
	this.rightVector = [0,1];
	this.leftVector = [0,-1];

	this.children = 2;

	this.direction = [0,-1];

	this.currentSquare = [5,5]

	this.move = function() {
		var newPos = [this.direction[0] + this.currentSquare[0],
									this.direction[1] + this.currentSquare[1]];
		return newPos;
	};

	this.history = [[5,5],[5,4]];

	this.update = function(board, move) {
		if(board.grid[move[0]][move[1]] === "A"){
				this.children += 1;
			}else{
				this.history.pop();
			}
			this.history.push(move);
	};

};


var Game = function() {
	this.board = Board.new;
	this.snake = Snake.new;
	
	this.step = function() {
		var move = snake.move();
		if(validMove(move)){
			snake.update(this.board, move);
			makeMove(move);
		}
	};

};

//ask about this in constructor

		// if(this.grid[move[0]][move[1]] === "A"){
			
		// }
