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
      {currentTheme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] "/>
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] "/>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}