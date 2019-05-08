import React, { Component } from 'react'
import './scss/TextBox.scss'

export default class TextBox extends Component {
  render() {
    return (
      <div className="textBoxContainer">
        {this.props.toCkeckWords
          ? this.props.toCkeckWords.map((word, i) => (
              <span
                key={i}
                className="special"
                onClick={() => this.props.onWordClick(word)}
              >
                {word.text}
              </span>
            ))
          : null}
      </div>
    )
  }
}
