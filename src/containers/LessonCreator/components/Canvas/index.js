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
  handleKek() {
    this.setState({ colr: 'green' })
  }

  handleStart(e) {}

  handleDrag({ offsetX, offsetY }, wi, pi) {
    console.log('offsetY: ', offsetY)
    console.log('offsetX: ', offsetX)
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

  handlePath(points) {
    let path = `M${points[0].x} ${points[0].y} C ${points[1].x} ${
      points[1].y
    }, ${points[2].x} ${points[2].y}, ${points[3].x} ${points[3].y}`
    return path
  }
  render() {
    const { canvasWords } = this.state

    return (
      <div className="canvasContainer" ref="canvasContainer">
        {canvasWords.map((el, i) => (
          <svg
            ref={`ref_${i}`}
            key={i}
            className="svgRect"
            width={el.width}
            height={el.height}
          >
            <path
              id={`el_${i}`}
              d={el.path}
              stroke="blue"
              stroke-width="1"
              fill="none"
            />

            <g stroke="black" strokeWidth="3" fill="black">
              {el.points.map((p, j) => (
                <Draggable
                  key={j}
                  scale={0}
                  onStart={e => this.handleStart(e)}
                  onDrag={e => this.handleDrag(e, i, j)}
                  onStop={e => this.handleStop(e, i, j)}
                >
                  <circle id={`point_${j}`} cx={p.x} cy={p.y} r="5" style={{cursor: 'move'}}/>
                </Draggable>
              ))}
            </g>

            <line
              x1={el.points[0].x}
              y1={el.points[0].y}
              x2={el.points[1].x}
              y2={el.points[1].y}
              style={{ stroke: 'rgb(255,0,0)', strokeWidth: 1 }}
            />
            <line
              x1={el.points[2].x}
              y1={el.points[2].y}
              x2={el.points[3].x}
              y2={el.points[3].y}
              style={{ stroke: 'rgb(255,0,0)', strokeWidth: 1 }}
            />

            <text fill={el.fill} fontSize={el.fontSize}>
              <textPath href={`#el_${i}`}>{el.text}</textPath>
            </text>
          </svg>
        ))}
      </div>
    )
  }
}