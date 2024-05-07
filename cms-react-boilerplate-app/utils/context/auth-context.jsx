import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import React, { createContext, useContext, useMemo } from 'react'

import authApi from '../apis/auth'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const sessionToken = Cookies.get('session-token')

  const { data: meData } = useQuery({
    enabled: !!sessionToken,
    queryKey: ['me', sessionToken],
    queryFn: () => authApi.me()
  })

  const memoizedToken = useMemo(() => sessionToken, [sessionToken])

  return <AuthContext.Provider value={{ sessionToken: memoizedToken, userData: meData?.userData }}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return { ...context }
}

export { AuthProvider, useAuth }
