var render = function(board) {
	$('.game').empty()
	for(var i = 0; i < board.grid.length; i++){
		for(var j = 0; j < board.grid.length; j++){
			if(board.grid[i][j] === "S") {
				$('.game').append('<div class="board" id="S"></div>');
			} else if(board.grid[i][j] === "B") {
				$('.game').append('<div class="board" id="B"></div>');
			} else if(board.grid[i][j] === "A") {
				$('.game').append('<div class="board" id="A"></div>');
			} else {	
			$('.game').append('<div class="board" id="' + i + '-' +  j +'"">' + board.grid[i][j] + '</div>');
			}
		}
	}
};

var listen = function(snake) {
	$('html').keydown(function (event) {
		snake.turn(event.keyCode);
	  console.log("You pressed keycode: " + event.keyCode);
	});
};



$(document).ready(function(){
	 var g = new Game(10);
	 g.board.clearBoard();
	 g.board.makeApple();
	 render(g.board);

	 listen(g.snake);

	 var play = function() {
	 	render(g.board);
	 	g.step();	
	 	window.setTimeout(play, 100);
	 };

	 
	 window.setTimeout(play, 100);

});