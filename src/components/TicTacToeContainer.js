import { useState, useEffect } from 'react';
import TicTacToeLayouts from './TicTacToeLayouts';
import store from '../store';
import { updateButtonText, toggleXRound, setWinner, resetGame } from '../actions/gameAction';

const TicTacToeContainer = () => {
    const [gameState, setGameState] = useState(store.getState().game);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setGameState(store.getState().game);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const onClickCell = (index) => {
        const { buttonText, xRound, winner } = gameState;
        if (buttonText[index] === "" && winner === null) {
            const newText = [...buttonText];
            newText[index] = xRound ? "X" : "O";
            store.dispatch(updateButtonText(newText));
            checkWinner(newText, winner);
            store.dispatch(toggleXRound());
        }
    };

    const onNewGame = () => {
        store.dispatch(resetGame());
    };

    const checkWinner = (newText, currentWinner) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                newText[a] &&
                newText[a] === newText[b] &&
                newText[a] === newText[c]
            ) {
                store.dispatch(setWinner(`Победил ${newText[a]}`));
                return;
            }
        }

        if (!newText.includes("") && currentWinner === null) {
            store.dispatch(setWinner("Ничья"));
        }
    };

    return (
        <TicTacToeLayouts
            buttonText={gameState.buttonText}
            xRound={gameState.xRound}
            winner={gameState.winner}
            onClickCell={onClickCell}
            onNewGame={onNewGame}
        />
    );
};

export default TicTacToeContainer;
