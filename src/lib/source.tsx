import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { DEFAULT_SOURCE } from '../config'
import { getSourceCode } from './whatsapp'

const SourceContext = createContext(DEFAULT_SOURCE)

/**
 * Kode sumber dibaca setelah mount supaya HTML prerender dan hidrasi tetap sama. `initial` adalah kode di HTML prerender
 * (sebelum JavaScript jalan): `V2` untuk halaman /v2/, supaya klik sebelum hidrasi tetap tercatat dari halaman itu.
 */
export function SourceProvider({ children, initial = DEFAULT_SOURCE }: { children: ReactNode; initial?: string }) {
  const [source, setSource] = useState(initial)
  useEffect(() => setSource(getSourceCode(window.location.search, window.location.pathname)), [])
  return <SourceContext.Provider value={source}>{children}</SourceContext.Provider>
}

export const useSource = () => useContext(SourceContext)
