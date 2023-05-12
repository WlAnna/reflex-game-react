import React, { Component } from 'react'
import './Square.css'

class Square extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(evt) {
        this.props.getScore(evt.target.value)
    }

    render() {

        let className = 'Square';
        if (this.props.color) {
            className += ' Square-color';
        }
        return (
            <button value={this.props.value} className={className} onClick={!this.props.endGame ? this.handleClick : null}>{this.props.index}</button>

        )
    }
}

export default Square
