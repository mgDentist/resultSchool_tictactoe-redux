const initialState = {
    buttonText: Array(9).fill(''),
    xRound: true,
    winner: null
};

function gameReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_BUTTON_TEXT':
            return {
                ...state,
                buttonText: action.payload
            };
        case 'TOGGLE_XROUND':
            return {
                ...state,
                xRound: !state.xRound
            };
        case 'SET_WINNER':
            return {
                ...state,
                winner: action.payload
            };
        case 'RESET_GAME':
            return initialState;
        default:
            return state;
    }
}

export default gameReducer;
