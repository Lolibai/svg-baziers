import React from 'react'

const ColorManager = ({value, onChange}) => {
  return <input type="color" value={value} onChange={onChange}/>
}

export default ColorManager
