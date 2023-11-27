import React, { Component } from 'react';
import TicTacToeLayouts from './TicTacToeLayouts';
import store from '../store';
import { updateButtonText, toggleXRound, setWinner, resetGame } from '../actions/gameAction';

class TicTacToeContainer extends Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onClickCell(index) {
        const state = store.getState().game;
        const buttonText = [...state.buttonText];
        if (buttonText[index] === "" && state.winner === null) {
            buttonText[index] = state.xRound ? "X" : "O";
            store.dispatch(updateButtonText(buttonText));
            this.whoIsWinner(buttonText);
            store.dispatch(toggleXRound());
        }
    }

    onNewGame() {
        store.dispatch(resetGame());
    }

    whoIsWinner(buttonText) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                buttonText[a] &&
                buttonText[a] === buttonText[b] &&
                buttonText[a] === buttonText[c]
            ) {
                store.dispatch(setWinner(`Победил ${buttonText[a]}`));
                return;
            }
        }

        if (!buttonText.includes("") && !store.getState().game.winner) {
            store.dispatch(setWinner("Ничья"));
        }
    }

    render() {
        const { buttonText, xRound, winner } = store.getState().game;
        return (
            <TicTacToeLayouts
                buttonText={buttonText}
                xRound={xRound}
                winner={winner}
                onClickCell={this.onClickCell.bind(this)}
                onNewGame={this.onNewGame.bind(this)}
            />
        );
    }
}

export default TicTacToeContainer;
