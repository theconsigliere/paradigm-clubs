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
  url?: string | null
  label?: string | null
  newTab?: boolean | null
  appearance?: 'default' | 'outline' | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  type?: 'button' | 'submit' | 'reset' | 'custom' | 'reference' | null
  variant?: ButtonVariant | null
}

const isExternal = (href: string): boolean => /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)

const isHashLink = (href: string): boolean => href.startsWith('#')

const normalizeCustomHref = (value?: string | null): string | undefined => {
  const trimmed = value?.trim()
  if (!trimmed) return undefined
  if (trimmed.startsWith('/') || trimmed.startsWith('#') || isExternal(trimmed)) return trimmed
  return `https://${trimmed}`
}

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
  url,
  label,
  newTab,
  reference,
  type,
  appearance,
  variant,
  ...props
}) => {
  const effectiveHref = href ?? url
  const effectiveVariant: ButtonVariant =
    variant ?? (appearance === 'outline' ? 'outline' : 'default')

  const resolvedHref =
    type === 'reference' ? resolveReferenceHref(reference) : normalizeCustomHref(effectiveHref)

  const { onClick, ...elementProps } = props as React.AnchorHTMLAttributes<HTMLAnchorElement> &
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
      onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    }

  const combinedClassName = cn(
    'btn',
    effectiveVariant === 'outline' && 'btn--outline',
    className,
    classNames,
  )
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const content = label && (
    <span className="btn__label--container" data-slot="button-label">
      <span className="btn__label btn__label--first">{label}</span>
      <span className="btn__label btn__label--second">{label}</span>
    </span>
  )

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

  if (isHashLink(resolvedHref)) {
    return (
      <a href={resolvedHref} className={combinedClassName} onClick={onClick} {...elementProps}>
        {content}
        {children}
      </a>
    )
  }

  const linkProps = {
    className: combinedClassName,
    onClick,
    ...elementProps,
    ...newTabProps,
  }

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
