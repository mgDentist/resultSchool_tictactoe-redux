export const updateButtonText = (newText) => ({
    type: 'UPDATE_BUTTON_TEXT',
    payload: newText
});

export const toggleXRound = () => ({
    type: 'TOGGLE_XROUND'
});

export const setWinner = (winner) => ({
    type: 'SET_WINNER',
    payload: winner
});

export const resetGame = () => ({
    type: 'RESET_GAME'
});
