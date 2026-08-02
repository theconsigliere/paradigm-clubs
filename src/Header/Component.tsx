import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { HeaderLogo } from './Logo'
import { HeaderNav } from './Nav'

export async function Header() {
  const headerData = await getCachedGlobal('header', 1)()
  const floatingNavigation = headerData?.floatingNavigation
  const closedNavigation = floatingNavigation?.closed
  const openNavigation = floatingNavigation?.open

  const closedLogo = closedNavigation?.logo || headerData.logo
  const openLogo = openNavigation?.logo || headerData.logo
  const navItems = openNavigation?.navItems || []
  const socialLinks = openNavigation?.socialLinks || []

  console.log('headerData', headerData)

  return (
    <>
      <header className="pd__headered">
        <div className="pd__header-inner">
          <Link className="pd__header-brand" href="/">
            <HeaderLogo logo={headerData.logo} />
          </Link>

          {headerData?.pageCTAButton && (
            <CMSLink className="pd__header-cta btn btn--primary" {...headerData.pageCTAButton} />
          )}
        </div>
      </header>

      <div className="pd__header-floating-naved">
        <div className="pd__header-floating-nav-closed">
          {closedLogo && typeof closedLogo === 'object' && (
            <Media
              className="pd__header-floating-nav-closed-logo"
              imgClassName="pd__header-floating-nav-closed-logo-image"
              loading="eager"
              priority
              resource={closedLogo}
            />
          )}

          {closedNavigation?.link && (
            <CMSLink
              className="pd__header-floating-nav-closed-link"
              {...closedNavigation.link}
              appearance="link"
            />
          )}

          {closedNavigation?.content && (
            <RichText
              className="pd__header-floating-nav-closed-content"
              data={closedNavigation.content}
              enableGutter={false}
              enableProse={false}
            />
          )}
        </div>

        <div className="pd__header-floating-nav-open">
          {openLogo && typeof openLogo === 'object' && (
            <Media
              className="pd__header-floating-nav-open-logo"
              imgClassName="pd__header-floating-nav-open-logo-image"
              loading="eager"
              priority
              resource={openLogo}
            />
          )}

          <div className="pd__header-nav">
            <HeaderNav navItems={navItems} socialLinks={socialLinks} />
          </div>
        </div>
      </div>
    </>
  )
}
