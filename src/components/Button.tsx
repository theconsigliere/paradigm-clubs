import type { ButtonProps as UIButtonProps } from '@/components/ui/button'
import type { Page, Post } from '@/payload-types'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

type ButtonVariant = NonNullable<UIButtonProps['variant']>

type ButtonProps = Omit<UIButtonProps, 'variant' | 'type'> & {
  children?: React.ReactNode
  classNames?: string | null
  href?: string | null
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  type?: 'button' | 'submit' | 'reset' | 'custom' | 'reference' | null
  variant?: ButtonVariant | null
}

const isExternal = (href: string): boolean => /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)

// Normalize a custom href: keep paths/anchors, add protocol to bare domains.
const normalizeCustomHref = (value?: string | null): string | undefined => {
  const trimmed = value?.trim()
  if (!trimmed) return undefined
  if (trimmed.startsWith('/') || trimmed.startsWith('#') || isExternal(trimmed)) return trimmed
  return `https://${trimmed}` // bare hostname (incl. www.) → external
}

// Build an internal href from a reference. Requires the linked doc to be
// populated (has `slug`) — a bare ID means the query depth was too low.
const resolveReferenceHref = (reference: ButtonProps['reference']): string | undefined => {
  const value = reference?.value
  if (!reference?.relationTo || value == null) return undefined

  const prefix = reference.relationTo === 'pages' ? '' : `/${reference.relationTo}`

  if (typeof value === 'object' && 'slug' in value && value.slug) {
    return `${prefix}/${value.slug}`
  }

  if (process.env.NODE_ENV !== 'production') {
    console.warn('Button reference is unpopulated (bare ID) — increase query depth:', reference)
  }
  return undefined
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  classNames,
  href,
  label,
  newTab,
  reference,
  type,
  ...props
}) => {
  const resolvedHref =
    type === 'reference' ? resolveReferenceHref(reference) : normalizeCustomHref(href)

  const { onClick, ...elementProps } = props as React.AnchorHTMLAttributes<HTMLAnchorElement> &
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
      onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    }

  const combinedClassName = cn('btn', className, classNames)
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const content = label && (
    <span className="btn__label--container" data-slot="button-label">
      <span className="btn__label btn__label--first">{label}</span>
      <span className="btn__label btn__label--second">{label}</span>
    </span>
  )

  // No usable href → render a real button.
  if (!resolvedHref) {
    return (
      <button
        className={combinedClassName}
        onClick={onClick}
        type={type === 'submit' || type === 'reset' ? type : 'button'}
        {...elementProps}
      >
        {content}
        {children}
      </button>
    )
  }

  const linkProps = {
    className: combinedClassName,
    onClick,
    ...elementProps,
    ...newTabProps,
  }

  // External URLs use a plain <a>; internal paths use Next <Link> for client-side routing.
  if (isExternal(resolvedHref)) {
    return (
      <a href={resolvedHref} {...linkProps}>
        {content}
        {children}
      </a>
    )
  }

  return (
    <Link href={resolvedHref} {...linkProps}>
      {content}
      {children}
    </Link>
  )
}
