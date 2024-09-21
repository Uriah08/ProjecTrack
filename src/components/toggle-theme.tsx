'use client'

import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { MoonIcon, SunIcon } from "lucide-react"

const ToggleTheme = () => {

    const { theme, setTheme } = useTheme()

    const handleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

  return (
    <Button variant="outline" size="icon" onClick={handleTheme} className="rounded-full">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
  )
}

export default ToggleTheme