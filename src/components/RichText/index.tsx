import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from 'lexical'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const colorStateKey = '$' as const

const getTextColorClassName = (node: Record<string, unknown>) => {
  const state = node[colorStateKey]

  if (!state || typeof state !== 'object') {
    return undefined
  }

  const color = (state as { color?: unknown }).color

  return typeof color === 'string' ? color : undefined
}

const TextWithColorClass = ({ node }: { node: Record<string, unknown> }) => {
  const colorClassName = getTextColorClassName(node)
  let content: React.ReactNode = (node.text as React.ReactNode) ?? ''

  const format = typeof node.format === 'number' ? node.format : 0

  if (format & IS_BOLD) {
    content = <strong>{content}</strong>
  }

  if (format & IS_ITALIC) {
    content = <em>{content}</em>
  }

  if (format & IS_STRIKETHROUGH) {
    content = <span style={{ textDecoration: 'line-through' }}>{content}</span>
  }

  if (format & IS_UNDERLINE) {
    content = <span style={{ textDecoration: 'underline' }}>{content}</span>
  }

  if (format & IS_CODE) {
    content = <code>{content}</code>
  }

  if (format & IS_SUBSCRIPT) {
    content = <sub>{content}</sub>
  }

  if (format & IS_SUPERSCRIPT) {
    content = <sup>{content}</sup>
  }

  if (!colorClassName) {
    return content
  }

  return <span className={colorClassName}>{content}</span>
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  text: TextWithColorClass,
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          // 'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
