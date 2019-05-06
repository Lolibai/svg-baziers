import React, { Component } from 'react'
import './scss/Lesson.scss'
import Canvas from './components/Canvas'
import TextBox from './components/TextBox'

export default class LessonCreator extends Component {
  state = {
    canvasWords: [
      {
        type: 'text',
        text: 'Hello World',
        fill: '#000',
        width: 200,
        fontSize: 18,
        height: 200,
        path: 'M10 50 C 50 0, 100 0, 200 50 Z',
        points: [
          { x: 10, y: 50 },
          { x: 50, y: 0 },
          { x: 100, y: 0 },
          { x: 200, y: 50 }
        ]
      },
      {
        type: 'text',
        text: 'Hello End',
        fill: '#000',
        fontSize: 18,
        width: 300,
        height: 300,
        path: '',
        points: [
          { x: 50, y: 150 },
          { x: 50, y: 0 },
          { x: 100, y: 0 },
          { x: 200, y: 50 }
        ]
      }
    ],
    toCkeckWords: [],
    word: ''
  }
  toCanvas(word) {}
  toTextBox(word) {}

  render() {
    const { canvasWords, toCkeckWords } = this.state
    return (
      <div className="LessonContainer">
        <div className="LessonActivity">
          <Canvas canvasWords={canvasWords} />
          <TextBox toCkeckWords={toCkeckWords} />
        </div>
        <div className="LessonUtility" />
      </div>
    )
  }
}
