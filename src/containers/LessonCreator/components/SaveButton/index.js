import React from 'react'

const SaveButton = ({ tx, onClick }) => {
  return <button onClick={onClick}>{tx}</button>
}

export default SaveButton
