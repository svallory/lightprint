import { createContext, useContext } from 'react'

const OverlayPortalContainerContext = createContext<HTMLElement | null>(null)
const OverlayThemeContext = createContext<'light' | 'dark' | null>(null)

function useOverlayPortalContainer() {
  return useContext(OverlayPortalContainerContext)
}

function useOverlayTheme() {
  return useContext(OverlayThemeContext)
}

export {
  OverlayPortalContainerContext,
  OverlayThemeContext,
  useOverlayPortalContainer,
  useOverlayTheme,
}
