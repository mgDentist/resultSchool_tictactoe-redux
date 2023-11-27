import styles from '../App.module.css';

function TicTacToeLayouts(props) {
    const { buttonText, xRound, winner, onClickCell, onNewGame } = props;

    const renderButtons = () => {
        return buttonText.map((text, index) => (
            <button
                className={styles.buttonCell}
                key={index}
                onClick={() => onClickCell(index)}
            >
                {text}
            </button>
        ));
    }

    return (
        <div
            className={styles.app}
        >
            <header
                className={styles.appHeader}
            >
                <button
                    className={styles.newGameButton}
                    onClick={onNewGame}
                >
                    Новая игра
                </button>
                <p
                    className={styles.cellsModule}
                >
                    {renderButtons()}
                </p>
                <p>
                    {winner ? `${winner}` : `Сейчас ходит: ${xRound ? 'X' : 'O'}`}
                </p>
            </header>
        </div>
    );
}

export default TicTacToeLayouts;
