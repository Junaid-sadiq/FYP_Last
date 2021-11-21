import React from 'react'
import {AuthProvider} from './AuthProvider'
import Routes from './Routes'
const PRoviders = () => {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  )
}

export default PRoviders


