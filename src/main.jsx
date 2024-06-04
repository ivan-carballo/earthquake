import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Recientes } from './componentes/recientes'
import { Buscador } from './componentes/buscador'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Buscador />
    <Recientes />
  </React.StrictMode>,
)
