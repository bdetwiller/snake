var render = function(board) {
	for(var i = 0; i < board.size; i++){
		for(var j = 0; j < board.size; j++){
			$('pre').text(board.grid[i][j]);			
		}
	}
};

$(document).ready(function(){
	 var b = new Board(10);
	 console.log(b.grid);
	 render(b);

});