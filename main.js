var id = 0;

function setUp(){
	var boardTB = document.getElementById("board-grid");

	for (var i=0; i<15; i++){
			var row =  document.createElement("tr");

		for (var j=0; j<15; j++){
			var cell =  document.createElement("td");
			cell.width = "30px";
			cell.height = "30px";
			cell.margin = "0px";
			cell.id = id++;



			row.appendChild(cell);
			// var btn =  document.createElement('input');
			// btn.type = "button";
			// btn.className= "btn";
			// btn.height = "100%";
			// btn.width = "100%";
			
			


			// cell.appendChild(btn);
		}

		boardTB.appendChild(row);
	}
}