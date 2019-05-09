import React, { Component } from 'react'
import './scss/Canvas.scss'
import Draggable from 'react-draggable'

export default class Canvas extends Component {
  state = {
    colr: '#000',
    canvasWords: []
  }

  componentDidMount() {
    const { canvasWords } = this.props
    let newWords = canvasWords
    newWords.forEach(w => {
      w.path = this.handlePath(w.points)
    })
    this.setState({ canvasWords: newWords })
  }

  componentDidUpdate(prevProps) {
    const { canvasWords, toSave, sendCanvas } = this.props
    if (prevProps.canvasWords.length < canvasWords.length) {
      let newWords = canvasWords
      newWords.forEach(w => {
        w.path = this.handlePath(w.points)
      })
      this.setState({ canvasWords: newWords })
    }
    if (toSave) {
      sendCanvas(this.state.canvasWords)
    }
  }

  handleKek() {
    this.setState({ colr: 'green' })
  }

  handleStart(e) {}

  handleDrag({ offsetX, offsetY }, wi, pi) {
    const { canvasWords } = this.state
    let newWords = canvasWords
    newWords[wi].points[pi].x = offsetX
    newWords[wi].points[pi].y = offsetY
    newWords[wi].path = this.handlePath(newWords[wi].points)
    this.setState(prevState => ({
      ...prevState,
      canvasWords: newWords
    }))
  }

  handleStop({ offsetX, offsetY }, wi, pi) {
    const { canvasWords } = this.state
    let newWords = canvasWords
    newWords[wi].points[pi].x = offsetX
    newWords[wi].points[pi].y = offsetY
    this.setState(prevState => ({
      ...prevState,
      canvasWords: newWords
    }))
  }

  handleSDrag({ offsetX, offsetY }, wi) {
    const { canvasWords } = this.state
    let newWords = canvasWords
    newWords[wi].x = offsetX
    newWords[wi].y = offsetY
    this.setState(prevState => ({
      ...prevState,
      canvasWords: newWords
    }))
  }

  handleSStop({ offsetX, offsetY }, wi) {
    const { canvasWords } = this.state
    let newWords = canvasWords
    newWords[wi].x = offsetX
    newWords[wi].y = offsetY
    this.setState(prevState => ({
      ...prevState,
      canvasWords: newWords
    }))
  }

  handlePath(points) {
    if (points.length > 0) {
      let path = `M${points[0].x} ${points[0].y} C ${points[1].x} ${
        points[1].y
      }, ${points[2].x} ${points[2].y}, ${points[3].x} ${points[3].y}`
      return path
    } else {
      return ''
    }
  }

  render() {
    const { canvasWords } = this.state
    const { onSelectWord } = this.props
    return (
      <svg className="canvasContainer" ref="canvasContainer">
        {canvasWords.map((el, i) => (
          <g key={i} className="textDraw" onClick={() => onSelectWord(i)}>
            {el.type === 'pathtext' ? (
              <path
                id={`el_${i}`}
                d={el.path}
                stroke={el.active ? 'blue' : 'none'}
                strokeWidth="1"
                fill="none"
              />
            ) : null}
            {el.active && el.type === 'pathtext' ? (
              <g stroke="black" strokeWidth="3" fill="black">
                {el.points.map((p, j) => (
                  <Draggable
                    key={j}
                    scale={0}
                    onStart={e => this.handleStart(e)}
                    onDrag={e => this.handleDrag(e, i, j)}
                    onStop={e => this.handleStop(e, i, j)}
                    disabled={!el.active}
                  >
                    <circle
                      className="circleParty"
                      id={`point_${j}`}
                      cx={p.x}
                      cy={p.y}
                      r="5"
                    />
                  </Draggable>
                ))}
              </g>
            ) : null}

            {el.active && el.type === 'pathtext' ? (
              <g>
                <line
                  x1={el.points[0].x}
                  y1={el.points[0].y}
                  x2={el.points[1].x}
                  y2={el.points[1].y}
                  style={{
                    stroke: el.active ? 'rgb(255,0,0)' : 'none',
                    strokeWidth: 1
                  }}
                />
                <line
                  x1={el.points[2].x}
                  y1={el.points[2].y}
                  x2={el.points[3].x}
                  y2={el.points[3].y}
                  style={{
                    stroke: el.active ? 'rgb(255,0,0)' : 'none',
                    strokeWidth: 1
                  }}
                />
              </g>
            ) : null}
            {el.type === 'pathtext' ? (
              <text fill={el.fill} fontSize={el.fontSize}>
                <textPath href={`#el_${i}`}>{el.text}</textPath>
              </text>
            ) : (
              <Draggable
                scale={0}
                onDrag={e => this.handleSDrag(e, i)}
                onStop={e => this.handleSStop(e, i)}
              >
                <text x={el.x} y={el.y} fill={el.fill} fontSize={el.fontSize}>
                  {el.text}
                </text>
              </Draggable>
            )}
          </g>
        ))}
      </svg>
    )
  }
}
