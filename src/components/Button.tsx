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

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  classNames,
  href,
  label,
  newTab,
  reference,
  type,
  variant,
  ...props
}) => {
  const resolvedVariant = (variant ?? 'default') as ButtonVariant

  const resolvedHref =
    type === 'reference' &&
    typeof reference?.value === 'object' &&
    'slug' in reference.value &&
    reference.value.slug
      ? `${reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''}/${reference.value.slug}`
      : href || undefined

  const { onClick, ...elementProps } = props as React.AnchorHTMLAttributes<HTMLAnchorElement> &
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
      onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    }
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
  const combinedClassName = cn('btn', className, classNames)

  if (!resolvedHref) {
    return (
      <button
        className={combinedClassName}
        onClick={onClick}
        type={type === 'submit' || type === 'reset' ? type : 'button'}
        {...elementProps}
      >
        {label && (
          <span className="btn__label--container" data-slot="button-label">
            <span className="btn__label btn__label--first">{label}</span>
            <span className="btn__label btn__label--second">{label}</span>
          </span>
        )}

        {children}
      </button>
    )
  }

  return (
    <Link
      className={combinedClassName}
      href={resolvedHref}
      {...elementProps}
      {...newTabProps}
      onClick={onClick}
    >
      {label && (
        <span className="btn__label--container" data-slot="button-label">
          <span className="btn__label btn__label--first">{label}</span>
          <span className="btn__label btn__label--second">{label}</span>
        </span>
      )}

      {children}
    </Link>
  )
}
