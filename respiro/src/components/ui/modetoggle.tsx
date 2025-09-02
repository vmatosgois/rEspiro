"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const [ currentTheme, setCurrentTheme ] = React.useState("dark")
    React.useEffect(() => {
      setTheme(currentTheme)
    }, [])


  const ToggleHandler = () => {
    if (currentTheme === "dark") {
      setCurrentTheme("root")
      setTheme("root")
    } else {
      setCurrentTheme("dark")
      setTheme("dark")
    }
  }

  return (
    <Button onClick={ToggleHandler} variant="outline" size="icon">
      <span className="relative w-[1.8rem] h-[1.8rem] flex items-center justify-center">
        {currentTheme === "dark" ? (
          <span className="rotate-90 scale-0 !transition-all duration-500 dark:rotate-0 dark:scale-100 transform">
            <Sun />
          </span>
        ) : (
          <span className="rotate-0 scale-100 !transition-all duration-500 dark:rotate-100 dark:scale-0 transform">
            <Moon/>
          </span>
        )}
        <span className="sr-only">Toggle theme</span>
      </span>
    </Button>
  )
}