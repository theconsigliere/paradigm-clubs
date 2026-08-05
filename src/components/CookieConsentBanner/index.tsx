'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const CONSENT_KEY = 'pd_cookie_consent'
const CONSENT_COOKIE = 'pd_cookie_consent'
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365

export const COOKIE_PREFERENCES_EVENT = 'pd:open-cookie-preferences'

export const openCookiePreferences = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT))
  }
}

type ConsentState = 'unknown' | 'accepted' | 'rejected'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const getCookieConsent = (): ConsentState => {
  if (typeof document === 'undefined') return 'unknown'

  const match = document.cookie.match(/(?:^|; )pd_cookie_consent=([^;]*)/)
  if (!match) return 'unknown'

  const value = decodeURIComponent(match[1])
  return value === 'accepted' || value === 'rejected' ? value : 'unknown'
}

const setConsentCookie = (value: Exclude<ConsentState, 'unknown'>) => {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secure}`
}

export const CookieConsentBanner = () => {
  const [consent, setConsent] = useState<ConsentState | null>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  // gtag.js is already loaded (with a denied-by-default consent state) by the root layout.
  // All this needs to do is tell Consent Mode when the user has made a choice.
  const applyConsent = useCallback((value: Exclude<ConsentState, 'unknown'>) => {
    window.gtag?.('consent', 'update', {
      analytics_storage: value === 'accepted' ? 'granted' : 'denied',
    })
  }, [])

  useEffect(() => {
    const cookieConsent = getCookieConsent()
    const localConsent = window.localStorage.getItem(CONSENT_KEY)
    const legacyConsent: ConsentState =
      localConsent === 'accepted' || localConsent === 'rejected' ? localConsent : 'unknown'
    const resolved: ConsentState = cookieConsent !== 'unknown' ? cookieConsent : legacyConsent

    if (cookieConsent === 'unknown' && resolved !== 'unknown') {
      setConsentCookie(resolved as Exclude<ConsentState, 'unknown'>)
    }

    setConsent(resolved)
    if (resolved !== 'unknown') applyConsent(resolved as Exclude<ConsentState, 'unknown'>)

    const reopen = () => setConsent('unknown')
    window.addEventListener(COOKIE_PREFERENCES_EVENT, reopen)
    return () => window.removeEventListener(COOKIE_PREFERENCES_EVENT, reopen)
  }, [applyConsent])

  useEffect(() => {
    if (consent === 'unknown') {
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null
      bannerRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
    } else {
      previouslyFocusedRef.current?.focus()
    }
  }, [consent])

  const updateConsent = (next: Exclude<ConsentState, 'unknown'>) => {
    window.localStorage.setItem(CONSENT_KEY, next)
    setConsentCookie(next)
    setConsent(next)
    applyConsent(next)
  }

  if (consent === null || consent !== 'unknown') return null

  return (
    <aside
      aria-describedby="pd-cookie-banner-text"
      aria-label="Cookie consent"
      aria-live="polite"
      className="pd__cookie-banner"
      ref={bannerRef}
    >
      <div className="pd__cookie-banner-inner">
        <p className="pd__cookie-banner-title" id="pd-cookie-banner-title">
          Cookie Preferences
        </p>
        <p className="pd__cookie-banner-text" id="pd-cookie-banner-text">
          We use analytics cookies to understand site usage and improve your experience. Read our{' '}
          <a href="/legal/privacy-policy">privacy policy</a> to learn more.
        </p>

        <div className="pd__cookie-banner-actions">
          <button
            className="btn btn--white"
            onClick={() => updateConsent('rejected')}
            type="button"
          >
            Decline
          </button>
          <button
            className="btn btn--primary"
            onClick={() => updateConsent('accepted')}
            type="button"
          >
            Accept
          </button>
        </div>
      </div>
    </aside>
  )
}
