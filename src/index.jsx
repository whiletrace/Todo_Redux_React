// module imports of note is configureStore and Root
import { render } from 'react-dom'
import React from 'react'
import configureStore from './redux/Configurestore'
import Root from './Components/Root'

// Configurestore (which is the entirety of my redux store) is passed to const store
// Root component which is entirety of react application is rendered with store passed
// top leval component all props from store to Provider and all children passed are passed from here

const store = configureStore()
render(
  <Root store={store} />,
  document.getElementById('root'),
)
