import React, { Component } from 'react'
import './scss/Lesson.scss'
import Canvas from './components/Canvas'
import TextBox from './components/TextBox'
import FontManager from './components/FontManager'
import TextManager from './components/TextManager'
import ColorManager from './components/ColorManager'
import AddSimpleWord from './components/AddSimpleWord'
import AddPathWord from './components/AddPathWord'
import ToTextBox from './components/ToTextBox'

export default class LessonCreator extends Component {
  state = {
    canvasWords: [
      {
        id: '1',
        type: 'pathtext',
        text: 'Hello World',
        fill: '#000000',
        fontSize: 18,
        path: 'M10 50 C 50 0, 100 0, 200 50 Z',
        points: [
          { x: 10, y: 50 },
          { x: 50, y: 0 },
          { x: 100, y: 0 },
          { x: 200, y: 50 }
        ],
        active: true
      },
      {
        id: '2',
        type: 'pathtext',
        text: 'Hello End',
        fill: '#000000',
        fontSize: 18,
        path: '',
        points: [
          { x: 50, y: 150 },
          { x: 150, y: 70 },
          { x: 200, y: 50 },
          { x: 300, y: 150 }
        ],
        active: false
      }
    ],
    toCheckWords: [],
    word: '',
    activeWord: { fontSize: '', text: '', fill: '' },
    activeIndex: null
  }

  componentDidMount() {
    const { canvasWords } = this.state
    this.setState({ activeWord: canvasWords[0], activeIndex: 0 })
  }

  toCanvas(word) {
    const { canvasWords } = this.state

    let newToCheckWords = []
    let newWords = canvasWords
    newWords.push(word)
    newToCheckWords = newToCheckWords.filter(
      checkWord => checkWord.text !== word.text
    )
    newWords.forEach((w, i) => {
      if (i !== newWords.length - 1) {
        w.active = false
      } else {
        w.active = true
      }
    })
    this.setState(prevState => ({
      ...prevState,
      canvasWords: newWords,
      toCheckWords: newToCheckWords,
      activeWord: newWords[newWords.length - 1],
      activeIndex: newWords.length - 1
    }))
  }

  toTextBox() {
    const { canvasWords, activeIndex } = this.state

    let newToCheckWords = []

    let newWords = canvasWords

    newToCheckWords.push(newWords[activeIndex])
    newWords.splice(activeIndex, 1)
    newWords.forEach((w, i) => {
      if (i !== newWords.length - 1) {
        w.active = false
      } else {
        w.active = true
      }
    })
    this.setState(prevState => ({
      ...prevState,
      canvasWords: newWords,
      toCheckWords: newToCheckWords,
      activeWord: newWords[newWords.length - 1],
      activeIndex: newWords.length - 1
    }))
  }

  handleActive(wi) {
    const { canvasWords } = this.state
    let newWords = canvasWords
    newWords.forEach((w, i) => {
      if (i !== wi) {
        w.active = false
      } else {
        w.active = true
      }
    })

    this.setState(prevState => ({
      ...prevState,
      canvasWords: newWords,
      activeWord: newWords[wi],
      activeIndex: wi
    }))
  }

  handleFontChange(e) {
    e.persist()
    const { canvasWords, activeIndex } = this.state
    let newWords = canvasWords
    newWords[activeIndex].fontSize = e.target.value
    this.setState(prevState => ({
      ...prevState,
      canvasWords: newWords,
      activeWord: {
        ...prevState.activeWord,
        fontSize: e.target.value
      }
    }))
  }

  handleTextChange(e) {
    e.persist()
    const { canvasWords, activeIndex } = this.state
    let newWords = canvasWords
    newWords[activeIndex].text = e.target.value
    this.setState(prevState => ({
      ...prevState,
      canvasWords: newWords,
      activeWord: {
        ...prevState.activeWord,
        text: e.target.value
      }
    }))
  }

  handleColorChange(e) {
    e.persist()
    const { canvasWords, activeIndex } = this.state
    let newWords = canvasWords
    newWords[activeIndex].fill = e.target.value
    this.setState(prevState => ({
      ...prevState,
      canvasWords: newWords,
      activeWord: {
        ...prevState.activeWord,
        fill: e.target.value
      }
    }))
  }

  handleAddSimpleWord() {
    const { canvasWords } = this.state
    let newWords = canvasWords
    newWords.forEach(w => {
      w.active = false
    })
    newWords.push({
      id: (canvasWords.length - 1).toString(),
      type: 'simpletext',
      text: 'Sample Text',
      fill: '#000000',
      fontSize: 18,
      path: '',
      points: [],
      active: true
    })
    this.setState(prevState => ({
      ...prevState,
      canvasWords: newWords,
      activeWord: newWords[canvasWords.length - 1],
      activeIndex: (canvasWords.length - 1).toString()
    }))
  }

  handleAddPathWord() {
    const { canvasWords } = this.state
    let newWords = canvasWords
    newWords.forEach(w => {
      w.active = false
    })
    newWords.push({
      id: (canvasWords.length - 1).toString(),
      type: 'pathtext',
      text: 'Sample Text',
      fill: '#000000',
      fontSize: 18,
      path: 'M415 233 C 477 155, 598 245, 655 171',
      points: [
        { x: 415, y: 233 },
        { x: 477, y: 155 },
        { x: 589, y: 248 },
        { x: 655, y: 171 }
      ],
      active: true
    })
    this.setState(prevState => ({
      ...prevState,
      canvasWords: newWords,
      activeWord: newWords[canvasWords.length - 1],
      activeIndex: (canvasWords.length - 1).toString()
    }))
  }

  render() {
    const { canvasWords, toCheckWords, activeWord } = this.state
    return (
      <div className="LessonContainer">
        <div className="LessonActivity">
          <Canvas
            canvasWords={canvasWords}
            onSelectWord={e => this.handleActive(e)}
          />
          <TextBox
            toCkeckWords={toCheckWords}
            onWordClick={word => this.toCanvas(word)}
          />
        </div>
        <div className="LessonUtility">
          <FontManager
            value={activeWord.fontSize}
            onChange={e => this.handleFontChange(e)}
          />
          <TextManager
            value={activeWord.text}
            onChange={e => this.handleTextChange(e)}
          />
          <ColorManager
            value={activeWord.fill}
            onChange={e => this.handleColorChange(e)}
          />
          <AddSimpleWord onClick={() => this.handleAddSimpleWord()} />
          <AddPathWord onClick={() => this.handleAddPathWord()} />
          <ToTextBox onClick={() => this.toTextBox()} />
        </div>
      </div>
    )
  }
}
