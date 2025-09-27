import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'antd/dist/reset.css'; // For Ant Design v5+

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)