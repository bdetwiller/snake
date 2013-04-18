var Board = function(size){
	this.grid = _.times(size, function() {return Array(size);});

	this.size = size;

	this.validMove = function(move) { 
		return(this.grid[move[0]][move[1]] != "S" && (move[0] >= 0 && move[0] <= size) && 
			(move[1] >= 0 && move[1] <= size))
	};

	this.makeMove = function(move, snake) {
		this.clearBoard();
		this.grid[this.apple[0]][this.apple[1]] = "A";
		console.log(snake.history.length);
		for(i = 0; i < snake.history.length; i++) {
			this.grid[snake.history[i][0]][snake.history[i][1]] = "B"
		};
		this.grid[move[0]][move[1]] = "S";
	};

	this.clearBoard = function() {
		for(var i = 0; i < size; i++) {
			for(var j = 0; j < size; j++) {
				this.grid[i][j] = ' ';
			}
		};
	};

	this.apple = [];

	this.makeApple = function() {
		while(true) {
			var x = Math.floor(Math.random() * size);
			var y = Math.floor(Math.random() * size);
			if (this.grid[x][y] != "S" && this.grid[x][y] != "B" ) {
				this.grid[x][y] = "A";
				this.apple = [[x],[y]];
				break;
			}
		}
	};

};

var Snake = function() {
	this.downVector = [1,0];
	this.upVector = [-1,0];
	this.rightVector = [0,1];
	this.leftVector = [0,-1];

	this.children = 2;

	this.direction = [0,-1];

	this.currentSquare = [5,5]

	this.turn = function(num) {
		switch(num) {
			case 37:
				this.direction = this.leftVector;
				break;
			case 38: 
				this.direction = this.upVector;
				break;
			case 39:
				this.direction = this.rightVector;
				break;
			case 40:
				this.direction = this.downVector;
				break;
		}
	};

	this.move = function() {
		var newPos = [this.direction[0] + this.currentSquare[0],
									this.direction[1] + this.currentSquare[1]];
		this.currentSquare = newPos
		return newPos;
	};

	this.history = [[5,5],[5,4]];

	this.update = function(board, move) {
		if(board.grid[move[0]][move[1]] === "A"){
				this.children += 1;
				board.makeApple();
			}else{
				this.history.pop();
			}
			this.history.unshift(move);
	};

};


var Game = function(size) {
	this.board = new Board(size);
	this.snake = new Snake;
	
	this.step = function() {
		var move = this.snake.move();
		if(this.board.validMove(move)){
			this.snake.update(this.board, move); //grows snake, updates apple location if hit
			this.board.makeMove(move, this.snake);
		}
	};

};

//ask about this in constructor

		// if(this.grid[move[0]][move[1]] === "A"){
			
		// }
