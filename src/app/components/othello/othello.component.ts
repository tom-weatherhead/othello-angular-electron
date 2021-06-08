// othello-angular-electron/src/app/components/othello/othello.component.ts

import {
	// AfterViewChecked,
	// AfterViewInit,
	// ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	ViewChild
} from '@angular/core';

import { /* ActivatedRoute, ParamMap, */ Router } from '@angular/router';
// import { Location }                         from '@angular/common';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { of, timer } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// From https://github.com/angular/angular-cli/wiki/stories-third-party-lib :
// First, add this line to src/typings.d.ts :
// declare module 'image-processing-js';
// Then:
// import * as imageProcessingJs from 'image-processing-js';

import { createInitialState, IGameState, moveAutomatically, moveManually } from 'thaw-reversi-engine.ts';
import { createAndFillArray } from 'thaw-common-utilities.ts';

const boardWidth = 8;
const boardHeight = boardWidth;

const boardSquareWidth = 50;
const boardSquareHeight = boardSquareWidth;

const colourWhite = '#ffffff';
const colourBlack = '#000000';
const colourGrey = '#7f7f7f';
const colourGold = '#d4af37';
// const colourGold = '#ffd700';

@Component({
	selector: 'app-othello',
	templateUrl: './othello.component.html',
	styleUrls: ['./othello.component.scss']
})
// export class AppComponent implements AfterViewChecked, AfterViewInit, OnInit {
export class OthelloComponent implements OnInit {
	@ViewChild('canvas', { static: true })
	canvas: ElementRef<HTMLCanvasElement>;

	board: string[][]; // Model
	gameState: IGameState; // Model
	context: CanvasRenderingContext2D; // View

	mapTokenCharToPlayerColourName = {
		'X': 'White',
		'O': 'Black',
		' ': 'Empty'
	};
	mapPlayerColourNameToBoolean = {
		Black: false,
		White: true
	};
	automaticMove: Record<string, boolean> = {
		X: false,
		O: true
	};
	playerPly: Record<string, number> = {
		X: 5,
		O: 5
	};
	// populations: any = {
	// 	X: 2,
	// 	O: 2
	// };
	blackPopulation = 2;
	whitePopulation = 2;
	lastMoveWasInvalid: boolean;
	isGameOver: boolean;
	showMessage = false;
	message = '';
	doOneAutomove = false;

	messageInPlyDDL = 'Ply: 5';
	optionsInPlyDDL = [4, 5, 6];

	// constructor(private cd: ChangeDetectorRef) {
	// constructor() {
	constructor(
		// private changeDetectorRef: ChangeDetectorRef,
		// private route: ActivatedRoute,
		private router: Router /*,
		private location: Location */
	) {}

	ngOnInit(): void {
		this.context = this.canvas.nativeElement.getContext('2d');
		this.onNewGame();
	}

	// ngAfterViewInit() {
	// }

	// ngAfterViewChecked() {
	// }

	changeMessageInPlyDDL(selectedPly: number): void {
		this.messageInPlyDDL = `Ply: ${selectedPly}`;
		this.playerPly.X = selectedPly;
		this.playerPly.O = selectedPly;
	}

	displayMessage(message: string): void {
		this.message = message;
		this.showMessage = !!message; // or message && message.length;
	}

	clearCanvas(): void {
		// TODO: Find some way to invalidate the entire canvas
		// in order to ensure that no artifacts are visible when (most of) the pieces are removed.

		// Test 1:
		// this.canvas.nativeElement.width = this.canvas.nativeElement.width;

		// Test 2:
		this.context.fillStyle = colourGold;
		this.context.fillRect(
			0,
			0,
			this.canvas.nativeElement.width,
			this.canvas.nativeElement.height
		);
		this.context.stroke(); // Actually draw the shapes that are described above.
	}

	onNewGame(): void {
		this.lastMoveWasInvalid = false;
		this.isGameOver = false;
		this.gameState = createInitialState();

		this.board = null; // This will force the board to be reconstructed.
		this.clearCanvas();

		this.updateBoardFromGameState();
		this.displayMessage(null);
		this.onAutomaticMove();
	}

	renderSquareOnBoard(row: number, col: number, isWhite: boolean): void {
		const squareBorderThickness = 2;
		const xOffset = col * boardSquareWidth;
		const yOffset = row * boardSquareHeight;

		// Draw the square's border.
		this.context.fillStyle = colourGold;
		this.context.fillRect(
			xOffset,
			yOffset,
			boardSquareWidth,
			boardSquareHeight
		);

		// Fill the interior of the square.
		this.context.fillStyle = colourGrey;
		this.context.fillRect(
			xOffset + 2,
			yOffset + 2,
			boardSquareWidth - 2 * squareBorderThickness,
			boardSquareHeight - 2 * squareBorderThickness
		);

		if (isWhite === true || isWhite === false) {
			const centerX = boardSquareWidth / 2;
			const centerY = boardSquareHeight / 2;
			const radius = Math.floor((boardSquareWidth * 2) / 5);
			const fillColour = isWhite ? colourWhite : colourBlack;

			this.context.beginPath();
			this.context.arc(
				xOffset + centerX,
				yOffset + centerY,
				radius,
				0,
				2 * Math.PI,
				false
			);
			this.context.fillStyle = fillColour;
			this.context.strokeStyle = fillColour;
			this.context.fill();
		}

		this.context.stroke(); // Actually draw the shapes that are described above.
	}

	updateBoardFromGameState(): void {
		if (!this.board) {
			// this.board = createAndFillArray(
			// 	'',
			// 	boardHeight,
			// 	boardWidth
			// );
			this.board = createAndFillArray(
				'',
				boardHeight,
				boardWidth
			) as string[][];
		}

		for (let row = 0; row < this.board.length; row++) {
			for (let col = 0; col < this.board[row].length; col++) {
				const currentColourName = this.board[row][col];
				const newColourName =
					this.mapTokenCharToPlayerColourName[
						this.gameState.boardAsString[
							row * this.board[row].length + col
						]
					];

				if (newColourName !== currentColourName) {
					this.board[row][col] = newColourName;
					this.renderSquareOnBoard(
						row,
						col,
						this.mapPlayerColourNameToBoolean[newColourName]
					);
				}
			}
		}

		this.blackPopulation = this.gameState.blackPopulation;
		this.whitePopulation = this.gameState.whitePopulation;
	}

	update_IsGameOver(): boolean {
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
			console.log('Black population:', this.gameState.blackPopulation);
			console.log('White population:', this.gameState.whitePopulation);

			const diff =
				this.gameState.blackPopulation - this.gameState.whitePopulation;
			let message;

			if (diff > 0) {
				message = `Black wins ${this.gameState.blackPopulation} to ${this.gameState.whitePopulation}`;
			} else if (diff < 0) {
				message = `White wins ${this.gameState.whitePopulation} to ${this.gameState.blackPopulation}`;
			} else {
				message = 'Tie game.';
			}

			console.log(message);
			this.displayMessage(message);
		}

		return this.isGameOver;
	}

	onAutomaticMove(): void {
		let player = this.gameState.player.token;

		if (
			!this.gameState.isGameOver &&
			(this.automaticMove[player] || this.doOneAutomove)
		) {
			this.doOneAutomove = false;

			const maxPly = this.playerPly[player];
			const moveResult = moveAutomatically(
				this.gameState,
				maxPly
			);

			if (typeof moveResult.lastBestMoveInfo !== 'undefined') {
				console.log(
					`Auto: ${moveResult.player.token} moved at row ${moveResult.lastBestMoveInfo.bestRow}, column ${moveResult.lastBestMoveInfo.bestColumn}`
				);
			}

			this.gameState = moveResult;
			this.updateBoardFromGameState();
			this.update_IsGameOver();
			player = this.gameState.player.token;

			if (this.automaticMove[player]) {
				setTimeout(() => this.onAutomaticMove(), 100);
			}
		}
	}

	onClickCanvas(event: { offsetX: number; offsetY: number; }): void {
		// console.log('typeof event:', typeof event);

		// const castEvent = event as { offsetX: number; offsetY: number; };

		// const row = Math.floor(castEvent.offsetY / boardSquareHeight);
		// const col = Math.floor(castEvent.offsetX / boardSquareWidth);
		const row = Math.floor(event.offsetY / boardSquareHeight);
		const col = Math.floor(event.offsetX / boardSquareWidth);

		if (row < 0 || row >= boardHeight || col < 0 || col >= boardWidth) {
			console.error(
				`Error in onClickCanvas() : row is ${row}; col is ${col}`
			);
			console.error('  Error in onClickCanvas() : event is', event);

			return;
		}

		console.log(
			`Manual: ${this.gameState.player.token} moved at row ${row}, column ${col}`
		);
		this.gameState = moveManually(this.gameState, row, col);
		this.updateBoardFromGameState();

		if (!this.update_IsGameOver()) {
			this.onAutomaticMove();
		}
	}

	onClickOneAutomove(): void {
		this.doOneAutomove = true;
		this.onAutomaticMove();
	}

	onClickNewGame(): void {
		this.onNewGame();
	}
}
