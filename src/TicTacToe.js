import { useState, useEffect } from "react";
import "./styles.css";
import { findBestMove, evaluate, isMovesLeft, Move } from '../src/game';


export default function TicTacToe() {
    const [isCPUNext, setIsCPUNext] = useState(false);
    const [winner, setWinner] = useState(null);
    const [board, setBoard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);
    const players = {
        CPU: {
            SYM: "O",
            NAME: "CPU",
        },
        HUMAN: {
            SYM: "X",
            NAME: "You",
        },
    };

    useEffect(() => {
        if (winner) return;
        if (isCPUNext) {
            cPUPlay();
        }
    }, [isCPUNext]);

    function playAgainFn() {
        setBoard([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ]);
        setWinner(null);
        setIsCPUNext(false);
    }

    function displayWinner() {
        if (winner === "draw") {
            return "It's a draw!";
        } else if (winner) {
            return `${winner} won!`;
        }
    }

    function displayTurn() {
        if (isCPUNext) {
            return "CPU's turn";
        } else {
            return "Your turn";
        }
    }

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    function getCPUTurn() {
        debugger
        let bestMove = new Move();
        bestMove = findBestMove(board)
        debugger
        return { row: bestMove.row, column: bestMove.col };
    }

    function checkWinner() {
        let result = evaluate(board);
        if (result === 10)
            setWinner(players?.CPU?.NAME)
        else if (result === -10)
            setWinner(players?.HUMAN?.NAME)
        else
            if (isMovesLeft(board))
                setWinner(null);
            else
                setWinner("draw");
    }

    function cPUPlay() {
        if (winner) return;
        sleep(1000);
        const cPUMove = getCPUTurn();
        board[cPUMove['row']][cPUMove['column']] = players?.CPU?.SYM;
        setBoard((board) => [...board]);
        checkWinner();
        setIsCPUNext(false);
    }

    function playFn(arrayIndex, index) {
        if (isCPUNext) return;
        if (winner) return;
        board[arrayIndex][index] = players?.HUMAN?.SYM;
        setBoard((board) => [...board]);
        checkWinner();
        setIsCPUNext(true);
    }

    return (
        <div style={{ width: "267px", margin: "auto", fontSize: "30px", textAlign: "center", paddingTop: "70px" }}>
            <div>{!winner && displayTurn()}</div>
            {winner && <h2>{displayWinner()}</h2>}
            {winner && (
                <button className="video_game_button" onClick={playAgainFn}>
                    Play Again
                </button>
            )}
            <div className="container">
                <div className="col">
                    <span onClick={() => playFn(0, 0)} className="cell">
                        {board[0][0]}
                    </span>
                    <span onClick={() => playFn(0, 1)} className="cell">
                        {board[0][1]}
                    </span>
                    <span onClick={() => playFn(0, 2)} className="cell">
                        {board[0][2]}
                    </span>
                </div>
                <div className="col">
                    <span onClick={() => playFn(1, 0)} className="cell">
                        {board[1][0]}
                    </span>
                    <span onClick={() => playFn(1, 1)} className="cell">
                        {board[1][1]}
                    </span>
                    <span onClick={() => playFn(1, 2)} className="cell">
                        {board[1][2]}
                    </span>
                </div>
                <div className="col">
                    <span onClick={() => playFn(2, 0)} className="cell">
                        {board[2][0]}
                    </span>
                    <span onClick={() => playFn(2, 1)} className="cell">
                        {board[2][1]}
                    </span>
                    <span onClick={() => playFn(2, 2)} className="cell">
                        {board[2][2]}
                    </span>
                </div>
            </div>
        </div>
    );
}

