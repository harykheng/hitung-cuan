import { useEffect, useState } from 'react'
import { DEFAULT_SOURCE } from '../config'
import { getSourceCode } from './whatsapp'

/** Kode sumber dibaca setelah mount supaya HTML prerender & hidrasi tetap sama. */
export function useSourceCode(): string {
  const [source, setSource] = useState(DEFAULT_SOURCE)
  useEffect(() => {
    setSource(getSourceCode(window.location.search))
  }, [])
  return source
}
