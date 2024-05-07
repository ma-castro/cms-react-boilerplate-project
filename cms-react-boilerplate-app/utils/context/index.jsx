import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { AuthProvider } from './auth-context'

const queryClient = new QueryClient()

const AppProviders = ({ children, eventId = null, productAreaId = null }) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
        {children}
    </AuthProvider>
  </QueryClientProvider>
)

export default AppProviders
