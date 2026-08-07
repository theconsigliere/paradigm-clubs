// components/LenisProvider.tsx
'use client'

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface LenisContextValue {
  lenis: Lenis | null
}

const LenisContext = createContext<LenisContextValue>({ lenis: null })

export function useLenis() {
  return useContext(LenisContext).lenis
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    })

    lenisRef.current = lenisInstance
    setLenis(lenisInstance)

    lenisInstance.on('scroll', ScrollTrigger.update)

    const update = (time: number) => {
      lenisInstance.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenisInstance.destroy()
      lenisRef.current = null
    }
  }, [])

  return <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>
}
