"use client";

import debounce from "lodash.debounce";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

// Client-side hook for managing accent color
export function useAccentColor(initialAccent: string | undefined) {
const router = useRouter()
const searchParams = useSearchParams()

// Default color to UCLA gold
const [accentColor, setAccentColor] = React.useState(initialAccent ?? "#ffb300")

React.useEffect(() => {
  const accent = searchParams.get("accent")

  if (accent) {
document.documentElement.style.setProperty("--accent-color", decodeURIComponent(accent))
  } else {
    setAccentColor(getComputedStyle(document.documentElement).getPropertyValue("--accent-color"))
  }
}, [searchParams])

const handleAccentColorChange = debounce((newAccentColor: string) => {
  setAccentColor(newAccentColor)
  document.documentElement.style.setProperty("--accent-color", newAccentColor)

  const newParams = new URLSearchParams(Array.from(searchParams.entries()));
newParams.set("accent", newAccentColor)
router.push(`?${newParams.toString()}`, { scroll: false})
}, 50)

return {accentColor, handleAccentColorChange}
}
