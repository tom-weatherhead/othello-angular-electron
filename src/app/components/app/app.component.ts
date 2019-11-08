// othello-angular-electron/src/app/components/app/app.component.ts

import {
	// AfterViewChecked,
	// AfterViewInit,
	// ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	ViewChild
} from '@angular/core';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { of, timer } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// From https://github.com/angular/angular-cli/wiki/stories-third-party-lib :
// First, add this line to src/typings.d.ts :
// declare module 'image-processing-js';
// Then:
// import * as imageProcessingJs from 'image-processing-js';

import * as gameEngine from 'thaw-reversi-engine';
import * as commonUtils from 'thaw-common-utilities.js';

const boardWidth: number = 8;
const boardHeight: number = boardWidth;

const boardSquareWidth: number = 50;
const boardSquareHeight: number = boardSquareWidth;

const colourWhite: string = '#ffffff';
const colourBlack: string = '#000000';
const colourGrey: string = '#7f7f7f';
const colourGold = '#d4af37';
// const colourGold = '#ffd700';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
// export class AppComponent implements AfterViewChecked, AfterViewInit, OnInit {
export class AppComponent implements OnInit {
	@ViewChild('canvas', { static: true })
	canvas: ElementRef<HTMLCanvasElement>;

	board: string[][]; // Model
	gameState: any; // Model
	context: CanvasRenderingContext2D; // View

	mapTokenCharToPlayerColourName = {
		'X': 'White',
		'O': 'Black',
		' ': 'Empty'
	};
	mapPlayerColourNameToBoolean = {
		'Black': false,
		'White': true
	};
	automaticMove: any = {
		'X': false,
		// 'X': true,
		'O': true
	};
	playerPly: any = {
		'X': 5,
		'O': 5
	};
	populations: any = {
		'X': 2,
		'O': 2
	};
	lastMoveWasInvalid: boolean;
	isGameOver: boolean;
	showMessage: boolean = false;
	message: string = '';
	doOneAutomove: boolean = false;

	messageInPlyDDL: string = "Ply: 5";
	optionsInPlyDDL: number[] = [4, 5, 6];

	toggleStatus: boolean = false;

	// constructor(private cd: ChangeDetectorRef) {
	constructor() {
	}

	ngOnInit() {
		this.context = this.canvas.nativeElement.getContext('2d');
		this.onNewGame();
	}

	// ngAfterViewInit() {
	// }

	// ngAfterViewChecked() {
	// }

	changeMessageInPlyDDL(selectedPly: number){
		this.messageInPlyDDL = `Ply: ${selectedPly}`;
		this.playerPly.X = selectedPly;
		this.playerPly.O = selectedPly;
	}

	displayMessage (message: string) {
		this.message = message;
		this.showMessage = !!message; // or message && message.length;
	}

	clearCanvas() {
		// TODO: Find some way to invalidate the entire canvas
		// in order to ensure that no artifacts are visible when (most of) the pieces are removed.

		// Test 1:
		this.canvas.nativeElement.width = this.canvas.nativeElement.width;

		// Test 2:
		this.context.fillStyle = colourGold;
		this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
		this.context.stroke();	// Actually draw the shapes that are described above.
	}

	onNewGame() {
		this.lastMoveWasInvalid = false;
		this.isGameOver = false;
		this.gameState = gameEngine.createInitialState();

		this.board = null; // This will force the board to be reconstructed.
		this.clearCanvas();

		this.updateBoardFromGameState();
		this.displayMessage(null);
		this.onAutomaticMove();
	}

	renderSquareOnBoard(row: number, col: number, isWhite: boolean) {
		const squareBorderThickness = 2;
		const xOffset = col * boardSquareWidth;
		const yOffset = row * boardSquareHeight;

		// Draw the square's border.
		this.context.fillStyle = colourGold;
		this.context.fillRect(xOffset, yOffset, boardSquareWidth, boardSquareHeight);

		// Fill the interior of the square.
		this.context.fillStyle = colourGrey;
		this.context.fillRect(xOffset + 2, yOffset + 2, boardSquareWidth - 2 * squareBorderThickness, boardSquareHeight - 2 * squareBorderThickness);

		if (isWhite === true || isWhite === false) {
			const centerX = boardSquareWidth / 2;
			const centerY = boardSquareHeight / 2;
			const radius = Math.floor(boardSquareWidth * 2 / 5);
			const fillColour = isWhite ? colourWhite : colourBlack;

			this.context.beginPath();
			this.context.arc(xOffset + centerX, yOffset + centerY, radius, 0, 2 * Math.PI, false);
			this.context.fillStyle = fillColour;
			this.context.strokeStyle = fillColour;
			this.context.fill();
		}

		this.context.stroke();	// Actually draw the shapes that are described above.
	}

	updateBoardFromGameState() {

		if (!this.board) {
			this.board = commonUtils.createAndFillArray('', boardHeight, boardWidth);
		}

		for (let row = 0; row < this.board.length; row++) {

			for (let col = 0; col < this.board[row].length; col++) {
				const currentColourName = this.board[row][col];
				const newColourName = this.mapTokenCharToPlayerColourName[this.gameState.boardAsString[row * this.board[row].length + col]];;

				if (newColourName !== currentColourName) {
					this.board[row][col] = newColourName;
					this.renderSquareOnBoard(
						row, col,
						this.mapPlayerColourNameToBoolean[newColourName]
					);
				}
			}
		}

		this.populations.X = this.gameState.populations.X;
		this.populations.O = this.gameState.populations.O;
	}

	update_IsGameOver () {

		if (this.gameState.isGameOver) {
			this.isGameOver = true;
		} else if (this.gameState.numPiecesFlippedInLastMove === 0) {

			if (this.lastMoveWasInvalid) {
				this.isGameOver = true;
			} else {
				this.lastMoveWasInvalid = true;
			}
		} else {
			this.lastMoveWasInvalid = false;
		}

		if (this.isGameOver) {
			console.log('Game over!');
			console.log('X population:', this.gameState.populations.X);
			console.log('O population:', this.gameState.populations.O);

			const diff = this.gameState.populations.X - this.gameState.populations.O;
			let message;

			if (diff > 0) {
				message = `X wins ${this.gameState.populations.X} to ${this.gameState.populations.O}`;
			} else if (diff < 0) {
				message = `O wins ${this.gameState.populations.O} to ${this.gameState.populations.X}`;
			} else {
				message = 'Tie game.';
			}

			console.log(message);
			this.displayMessage(message);
		}

		return this.isGameOver;
	}

	onAutomaticMove() {
		let player = this.gameState.player;

		if (!this.gameState.isGameOver && (this.automaticMove[player] || this.doOneAutomove)) {
			this.doOneAutomove = false;

			const maxPly = this.playerPly[player];
			const moveResult = gameEngine.moveAutomatically(this.gameState, maxPly);

			console.log(`Auto: ${moveResult.gameState.player} moved at row ${moveResult.bestRow}, column ${moveResult.bestColumn}`);
			this.gameState = moveResult.gameState;
			this.updateBoardFromGameState();
			this.update_IsGameOver();
			player = this.gameState.player;

			if (this.automaticMove[player]) {
				setTimeout(() => this.onAutomaticMove(), 100);
			}
		}
	}

	onClickCanvas(event: any) {
		const row = Math.floor(event.offsetY / boardSquareHeight);
		const col = Math.floor(event.offsetX / boardSquareWidth);

		if (row < 0 || row >= boardHeight || col < 0 || col >= boardWidth) {
			console.error(`Error in onClickCanvas() : row is ${row}; col is ${col}`);
			console.error('  Error in onClickCanvas() : event is', event);

			return;
		}

		console.log(`Manual: ${this.gameState.player} moved at row ${row}, column ${col}`);
		this.gameState = gameEngine.moveManually(this.gameState, row, col);
		this.updateBoardFromGameState();

		if (!this.update_IsGameOver()) {
			this.onAutomaticMove();
		}
	}

	onClickOneAutomove() {
		this.doOneAutomove = true;
		this.onAutomaticMove();
	}

	onClickNewGame() {
		this.onNewGame();
	}

	menuToggle() {
		this.toggleStatus = !this.toggleStatus;
	}
}
