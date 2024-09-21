import React, { ReactNode } from 'react'
import { ThemeProvider } from '../theme-provider'

type Props = {
    children: ReactNode
}

const Provider = ({children}: Props) => {
  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    >
        {children}
    </ThemeProvider>
  )
}

export default Provider