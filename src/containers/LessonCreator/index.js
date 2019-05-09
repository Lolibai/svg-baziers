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
import SaveButton from './components/SaveButton'
import {
  createWord,
  updateWord,
  getWords,
  removeWord,
  order,
  checkOrder
} from '../../services/word.service'
export default class LessonCreator extends Component {
  state = {
    canvasWords: [],
    toCheckWords: [],
    word: '',
    activeWord: { fontSize: '', text: '', fill: '' },
    activeIndex: 0,
    toSave: false,
    result: null
  }

  componentDidMount() {
    this.getCanvasWords()
  }

  getCanvasWords() {
    const { canvasWords } = this.state
    getWords().then(data => {
      this.setState({ canvasWords: data }, () =>
        this.setState({
          activeWord:
            canvasWords.length > 0
              ? canvasWords[canvasWords.length - 1]
              : canvasWords[0],
          activeIndex: canvasWords.length > 0 ? canvasWords.length - 1 : 0
        })
      )
    })
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
    this.setState(
      prevState => ({
        ...prevState,
        canvasWords: newWords,
        toCheckWords: newToCheckWords,
        activeWord: newWords[newWords.length - 1],
        activeIndex: newWords.length - 1
      }),
      () => {
        console.log(this.state)
      }
    )
  }

  toTextBox() {
    const { canvasWords, activeIndex, toCheckWords } = this.state

    let newToCheckWords = toCheckWords

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
    createWord({
      type: 'simpletext',
      text: 'Sample Text',
      fill: '#000000',
      fontSize: 18,
      path: '',
      points: [],
      x: 200,
      y: 200,
      active: true
    }).then(word => this.toCanvas(word))
  }

  handleAddPathWord() {
    createWord({
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
    }).then(word => this.toCanvas(word))
  }

  handleSave() {
    this.setState({ toSave: true })
  }

  handleNewCanvas(words) {
    words.forEach(word => {
      if (word._id) {
        updateWord(word)
      } else {
        createWord(word)
      }
    })
    this.setState({ toSave: false })
  }

  onSaveOrder() {
    const { toCheckWords } = this.state
    order({ lesson: 'common', word: toCheckWords.map(w => w.text).join(' ') })
  }

  onCheckOrder() {
    const { toCheckWords } = this.state
    checkOrder({
      lesson: 'common',
      word: toCheckWords.map(w => w.text).join(' ')
    }).then(({ result }) => {
      this.setState({ result })
    })
  }

  handleRemove() {
    const { canvasWords, activeIndex } = this.state
    if (canvasWords[activeIndex] && canvasWords[activeIndex]._id) {
      removeWord(canvasWords[activeIndex]._id).then(() => {
        const { canvasWords } = this.state
        let newWords = canvasWords
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
          activeWord:
            newWords.length > 0 ? newWords[newWords.length - 1] : null,
          activeIndex: newWords.length > 0 ? newWords.length - 1 : null
        }))
      })
    } else {
      const { canvasWords } = this.state
      let newWords = canvasWords
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
        activeWord: newWords.length > 0 ? newWords[newWords.length - 1] : null,
        activeIndex: newWords.length > 0 ? newWords.length - 1 : null
      }))
    }
  }

  render() {
    const { canvasWords, toCheckWords, activeWord, toSave, result } = this.state
    return (
      <div className="LessonContainer">
        <div className="LessonActivity">
          <Canvas
            sendCanvas={e => this.handleNewCanvas(e)}
            toSave={toSave}
            canvasWords={canvasWords}
            onSelectWord={e => this.handleActive(e)}
          />
          <TextBox
            toCheckWords={toCheckWords}
            onWordClick={word => this.toCanvas(word)}
          />
        </div>
        <div className="LessonUtility">
          {result === true ? (
            <h4>OK</h4>
          ) : result === false ? (
            <h4>BAD</h4>
          ) : null}
          <FontManager
            value={activeWord ? activeWord.fontSize : ''}
            onChange={e => this.handleFontChange(e)}
          />
          <TextManager
            value={activeWord ? activeWord.text : ''}
            onChange={e => this.handleTextChange(e)}
          />
          <ColorManager
            value={activeWord ? activeWord.fill : ''}
            onChange={e => this.handleColorChange(e)}
          />
          <AddSimpleWord onClick={() => this.handleAddSimpleWord()} />
          <AddPathWord onClick={() => this.handleAddPathWord()} />
          <ToTextBox onClick={() => this.toTextBox()} />
          <SaveButton tx="Save Canvas" onClick={() => this.handleSave()} />
          <SaveButton tx="Save Order" onClick={() => this.onSaveOrder()} />
          <SaveButton tx="Check Order" onClick={() => this.onCheckOrder()} />
          <SaveButton tx="Remove" onClick={() => this.handleRemove()} />
        </div>
      </div>
    )
  }
}
