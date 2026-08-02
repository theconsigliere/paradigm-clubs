import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

type HeaderNavProps = {
  navItems: NonNullable<NonNullable<HeaderType['floatingNavigation']['open']>['navItems']>
  socialLinks: NonNullable<NonNullable<HeaderType['floatingNavigation']['open']>['socialLinks']>
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ navItems, socialLinks }) => {

  return (
    <div className="pd__header-nav-inner">
      <nav className="pd__header-links">
        {navItems.map(({ link }, i) => {
          return <CMSLink className="pd__header-nav-link" key={i} {...link} appearance="link" />
        })}
      </nav>

      <nav className="pd__header-social-links">
        {socialLinks.map(({ link }, i) => {
          return (
            <CMSLink className="pd__header-social-link" key={i} {...link} appearance="link" />
          )
        })}
      </nav>
    </div>
  )
}
