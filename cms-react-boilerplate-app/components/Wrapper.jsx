import React from 'react'
import AppProviders from '../utils/context'

const Wrapper = ({ children, ...props }) => {
  return <AppProviders {...props}>{children}</AppProviders>
}

export default Wrapper
