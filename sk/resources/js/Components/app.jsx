import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import RoutesComponents from './Routes/RoutesComponents'
const App = () => {
  return (
    <BrowserRouter>
        <RoutesComponents/>
    </BrowserRouter>
  )
}

export default App
