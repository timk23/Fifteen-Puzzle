// Timothy Kim
// This is the javascript to add create puzzle pieces and add functionality
// to the pieces, along with the shuffle button.

(function() {
	"use strict";

	window.onload = function() {
		createPieces(); // Create the game pieces
		adjacent(); // Check to see which pieces are adjacent
		$("shufflebutton").onclick = mixIt; // Add shuffle functionality to the shuffle button
	};

	function createPieces() {
		for (var i = 1; i <= 4; i++) {
			for (var j = 1; j <= 4; j++) { // Nested for loop to set up 15 different x & y coordinates
				if (i == 4 && j == 4) { // Exception for the sixteenth piece, made into a ghost piece
					var piece = document.createElement("div");
					piece.id = "ghostPiece";
					piece.style.left = "300px";
					piece.style.top = "300px";
					$("puzzlearea").appendChild(piece);
				} else { // Creating pieces and setting x & y coordinated according to the for loops
					var piece = document.createElement("div");
					piece.innerHTML = (i - 1) * 4 + j;
					piece.className = "piece";
					var position = "-" + ((j - 1) * 100).toString() + "px ";
					position += "-" + ((i - 1) * 100).toString() + "px";
					piece.style.backgroundPosition = position;
					piece.style.left = ((j - 1) * 100).toString() + "px ";
					piece.style.top = ((i - 1) * 100).toString() + "px";
					$("puzzlearea").appendChild(piece);
				}
			}
		}
	}

	function adjacent() { // Function sees which pieces are adjacent to the ghost piece
		var pieces = document.querySelectorAll(".piece");
		var ghost = $("ghostPiece");
		var ghostLeft = parseInt(comp(ghost).left);
		var ghostTop = parseInt(comp(ghost).top);
		for (var i = 0; i < pieces.length; i++) {
			if (next(pieces[i], ghostLeft, ghostTop, true) || next(pieces[i], ghostLeft, ghostTop, false)) {			
				pieces[i].classList.add("adjacent"); // Adding an adjacent class
				pieces[i].onclick = switchPiece1; // Adding piece switching functionality to the piece
			} else {
				pieces[i].classList.remove("adjacent"); // Removing the adjacent class if existing on a piece
				pieces[i].onclick = null; // Nullifying onclick functionality for a piece
			}
		}
	}

	function next(piece, ghostLeft, ghostTop, top) { // Returns whether a piece is adjacent as a bool
		if (top) { // Checks whether a piece is to the left or right of the ghost piece
			if (parseInt(comp(piece).left) == ghostLeft - 100 || parseInt(comp(piece).left) == ghostLeft + 100) {
				if (parseInt(comp(piece).top) == ghostTop) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else { // Checks whether a piece is above or below the ghost piece
			if (parseInt(comp(piece).top) == ghostTop - 100 || parseInt(comp(piece).top) == ghostTop + 100) {
				if (parseInt(comp(piece).left) == ghostLeft) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
	}

	function switchPiece1() { // Switches a piece with the ghost piece, to be declared without a parameter
		var ghost = $("ghostPiece");
		var ghostLeft = parseInt(comp(ghost).left);
		var ghostTop = parseInt(comp(ghost).top);
		var thisLeft = parseInt(comp(this).left);
		var thisTop = parseInt(comp(this).top);

		var dummyLeft = 0; // Dummy variables set up to switch left and top values
		var dummyTop = 0;

		dummyLeft = thisLeft; // Reassigning variables
		dummyTop = thisTop;
		thisLeft = ghostLeft;
		thisTop = ghostTop;

		ghost.style.left = dummyLeft.toString() + "px"; // Changing styles
		ghost.style.top = dummyTop.toString() + "px";
		this.style.left = thisLeft.toString() + "px";
		this.style.top = thisTop.toString() + "px";

		adjacent();
	}

	// Switches a piece with the ghost piece, to be declared with a parameter
	function switchPiece2(newPiece) {
		var ghost = $("ghostPiece");
		var ghostLeft = parseInt(comp(ghost).left);
		var ghostTop = parseInt(comp(ghost).top);
		var thisLeft = parseInt(comp(newPiece).left);
		var thisTop = parseInt(comp(newPiece).top);

		var dummyLeft = 0; // Dummy variables set up to switch left and top values
		var dummyTop = 0;

		dummyLeft = thisLeft; // Reassigning variables
		dummyTop = thisTop;
		thisLeft = ghostLeft;
		thisTop = ghostTop;

		ghost.style.left = dummyLeft.toString() + "px"; // Changing styles
		ghost.style.top = dummyTop.toString() + "px";
		newPiece.style.left = thisLeft.toString() + "px";
		newPiece.style.top = thisTop.toString() + "px";

		adjacent();
	}

	function mixIt() { // Randomely picks an adjacent piece and calls the piece switch method
		for (var i = 1; i <= 1000; i++) { // Run 1000 random piece switches
			var nextTo = document.querySelectorAll(".adjacent");
			var rand = Math.floor(Math.random() * nextTo.length);
			switchPiece2(nextTo[rand]);
		}
	}

	function $(elem) { // Function to make writing getElementById easier
		return document.getElementById(elem);
	}

	function comp(elem) { // Function to make writing getComputedStyle easier
		return window.getComputedStyle(elem);
	}
} ());
