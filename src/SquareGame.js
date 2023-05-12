import React, { Component } from 'react'
import Square from './Square'
import './SquareGame.css'
import { choice, getLocalStorageData } from "./helpers";


class SquareGame extends Component {
    static defaultProps = {
        num: 25,  // Board size
        resultNum: 5  // Num of local storage results
    }
    constructor(props) {
        super(props);
        this.state = {
            rolling: false,
            updatedColor: false,
            interval: null,
            endGame: true,
            isShowing: false,
            points: 0,
            fails: 0,
            lives: 3,
            timer: 10,
            history: JSON.parse(localStorage.getItem('points')) || []
        }
        this.startGame = this.startGame.bind(this)
        this.setTimeframe = this.setTimeframe.bind(this)
        this.getScore = this.getScore.bind(this)
        this.finishGame = this.finishGame.bind(this)
        this.reset = this.reset.bind(this)
        this.clearHistory = this.clearHistory.bind(this)
        this.interval = ''
        this.timerInterval = ''
        this.timeframe = ''
        this.arrWithPoints = []
    }

    // Set timeframe and update local storage
    setTimeframe() {
        // Get array of data from local storage
        this.arrWithPoints = getLocalStorageData(this.state.points, this.props.resultNum)

        // After finish game add results to local storage
        this.setState(st => ({ endGame: true }), () => window.localStorage.setItem("points", JSON.stringify(this.arrWithPoints)))

        // Set history state with updated local storage array
        this.setState({
            history: this.arrWithPoints
        })
    }

    // Start game
    startGame() {
        // Set the timeframe of the game and update local storage
        this.timeframe = setTimeout(this.setTimeframe, 10000)

        //  Set endGame state to false while playing the game
        this.setState({
            endGame: false
        })

        // Calculate random colors and set the state to display them
        this.interval = setInterval(() => {
            this.setState({
                interval: choice(this.props.num), isShowing: true
            })
            setTimeout(() => {
                this.setState({
                    interval: null, isShowing: false
                })
            }, 1000);
        }, 3000);

        // Show ticking clock
        this.timerInterval = setInterval(() => { this.setState(st => ({ timer: st.timer - 1 })) }, 1000)

    }

    // Calculate the score when clicked on a single square
    getScore(value) {
        // When you click on green color
        if (+ value === this.state.interval) {
            this.setState(st => ({ points: st.points + 1 }))
            // When you click on any other color
        } else {
            alert('You lost life')
            this.setState(st => ({ fails: st.fails + 1, lives: st.lives === 0 ? 0 : st.lives - 1 }))
        }

    }

    // Clear showing colors interval and ticking clock interval
    finishGame() {
        // clearInterval(this.timeframe);
        clearInterval(this.interval);
        clearInterval(this.timerInterval);
    }

    // Clear state to default values
    reset() {
        this.setState({
            rolling: false,
            updatedColor: false,
            interval: null,
            endGame: true,
            isShowing: false,
            points: 0,
            fails: 0,
            lives: 3,
            timer: 10,
            history: JSON.parse(localStorage.getItem('points')) || []
        })
    }

    // Clear local storage and history state
    clearHistory() {
        localStorage.clear()
        this.setState({ history: JSON.parse(localStorage.getItem('points')) || [] })
    }

    render() {
        // Display board
        const result = Array.from({ length: this.props.num }).map((x, index) => (
            <Square key={index} endGame={this.state.endGame} value={index} getScore={this.getScore} index={index} color={(index === this.state.interval) && !this.state.endGame} />
        ));

        // When game is over
        if (this.state.timer === 0 || this.state.lives === 0) {
            this.finishGame()
        }

        return (

            <div className='SquareGame'>
                <div className='SquareGame-heading'>
                    <p>Lives: {this.state.lives}</p>
                    <p>Points: {this.state.points}</p>
                    <h1>Reflex</h1>
                    <p>Timer: {this.state.timer} s.</p>
                </div>
                <div className='SquareGame-gameover'>
                    {(this.state.lives === 0 || this.state.timer === 0) && 'Game Over!!'}
                </div>
                <div className='SquareGame-board'>
                    <div className='SquareGame-board-container'>
                        <div className='SquareGame-board-squares'>
                            {result}
                        </div>
                        <div className='SquareGame-board-buttons'>
                            <button onClick={this.startGame}>Start</button>
                            <button onClick={this.reset}>Reset</button>
                        </div>
                    </div>
                </div>

                <div className='SquareGame-history'>
                    <p>Your previous {this.props.resultNum} scores: </p>

                    <ol>
                        {this.state.history !== null && this.state.history.map((el, index) => (
                            <li key={index} >{el}</li>
                        ))}
                    </ol>
                    <button onClick={this.clearHistory}>Clear history</button>
                </div>
            </div>

        )
    }
}

export default SquareGame


