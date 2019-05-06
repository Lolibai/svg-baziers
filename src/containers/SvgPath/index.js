import React, { Component } from 'react'

export default class SvgPath extends Component {
  render() {
    return (
      <div>
        <svg height="500" width="500">
          <path
            id="tryPlay"
            d="M0 50 C 500 1, 500 500, 0 500 Z"
            stroke="black"
            fill="transparent"
          />
          <text>
            <textPath href="#tryPlay">
              Sorry, your browser does not support inline SVG.
            </textPath>
          </text>
        </svg>
      </div>
    )
  }
}
