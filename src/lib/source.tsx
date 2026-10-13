import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { DEFAULT_SOURCE } from '../config'
import { getSourceCode } from './whatsapp'

const SourceContext = createContext(DEFAULT_SOURCE)

/** Kode sumber dibaca setelah mount supaya HTML prerender dan hidrasi tetap sama. */
export function SourceProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState(DEFAULT_SOURCE)
  useEffect(() => setSource(getSourceCode(window.location.search)), [])
  return <SourceContext.Provider value={source}>{children}</SourceContext.Provider>
}

export const useSource = () => useContext(SourceContext)
