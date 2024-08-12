import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import RoutesComponents from './Routes/RoutesComponents'
const app = () => {
  return (
    <BrowserRouter>
        <RoutesComponents/>
    </BrowserRouter>
  )
}

export default app
