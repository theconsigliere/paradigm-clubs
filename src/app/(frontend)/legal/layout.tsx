"use client"

import React, { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

export default function LegalLayout({ children }: Props) {
  useEffect(() => {
    const root = document.documentElement

    root.classList.add('is-legal-page', 'collection-legal-pages')

    return () => {
      root.classList.remove('is-legal-page', 'collection-legal-pages')
    }
  }, [])

  return <>{children}</>
}
