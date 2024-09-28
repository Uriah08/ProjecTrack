"use client"

import React, { ReactNode } from 'react'
import { ThemeProvider } from '../theme-provider'
import { SessionProvider } from 'next-auth/react'
import { store, persistor } from '@/src/store/store'
import { Provider as ReduxProvider } from 'react-redux';
import dynamic from 'next/dynamic';

type Props = {
    children: ReactNode
}

const Provider = ({children}: Props) => {

  const PersistGateDynamic = dynamic(() =>
    import('redux-persist/integration/react').then((mod) => mod.PersistGate), {
    ssr: false
  });

  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    >
      <SessionProvider>
        <ReduxProvider store={store}>
          <PersistGateDynamic loading={null} persistor={persistor}>
            {children}
          </PersistGateDynamic>
        </ReduxProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}

export default Provider