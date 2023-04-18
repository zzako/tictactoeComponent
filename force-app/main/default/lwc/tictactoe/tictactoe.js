import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Tictactoe extends LightningElement {

    value = 'X';
    clicked = "";
    @api o_wins = [];
    @api x_wins = [];
    @api result = "Result";


    @api winning_combinations =
        [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

    @api board = ["", "", "",
        "", "", "",
        "", "", ""];


    handleClick(event) {

        console.log(event.target.innerHTML);
        this.clicked = event.target;
        this.board[parseInt(event.target.id)] = this.value;
        this.clicked.innerHTML = this.value;
        this.switchPlayer();
        this.result = this.value;
        this.checkWin();

    }

    switchPlayer() {

        if (this.value == 'X') {
            this.value = 'O';
        }
        else if (this.value == 'O') {
            this.value = "X";
        }
    }

    getValues() {

        for (let i = 0; i < this.winning_combinations.length; i++) {
            const [a, b, c] = this.winning_combinations[i];
            if (this.board[a] !== "" && this.board[a] === this.board[b] && this.board[b] === this.board[c]) {
                return this.board[a];
            }
        }

        return null;

    }

    checkWin() {
        const evtX = new ShowToastEvent({
            title: 'X win',
            message: 'X wins',
            variant: 'success',
            mode: 'dismissable'
        });

        const evtO = new ShowToastEvent({
            title: 'O win',
            message: 'O wins',
            variant: 'success',
            mode: 'dismissable'
        });
        this.result = "checking winner";
        const winner = this.getValues();
        if (winner) {
            if (winner === "X") {
                this.dispatchEvent(evtX);
            }
            else if (winner === "O") {
                this.dispatchEvent(evtO);
            }

        }
        else if (this.checkDraw()) {
            this.result = "draw";
        }


    }

    checkDraw() {
        return !this.board.includes("");
    }

    reset() {
        const Boxes = this.template.querySelectorAll(".box");
        this.value = 'X';
        for (let i = 0; i < Boxes.length; i++) {
            Boxes[i].innerHTML = "";
        }
        for(let i = 0; i < this.board.length; i++)
        {
            this.board[i] = '';
        }
    }



}