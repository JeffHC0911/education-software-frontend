import React from 'react'
import ReactDOM from 'react-dom/client'
import {EducationApp} from './EducationApp'
import './helpers/i18n'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EducationApp />
  </React.StrictMode>,
)
