import React from 'react'
import ReactDOM from 'react-dom/client'
import { Squeak } from './index'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Squeak
      apiHost='http://localhost:3000'
      organizationId=''
      onSubmit={() => {}}
      onSignUp={() => {}}
      onLoad={() => {}}
    />
  </React.StrictMode>
)
