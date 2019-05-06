import React from 'react'
import { Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route render={() => <Component {...rest} />} />
}

export default PrivateRoute
