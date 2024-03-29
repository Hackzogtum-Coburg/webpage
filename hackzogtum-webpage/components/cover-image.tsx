import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

export interface CoverData {
  title: string,
  src: string,
  slug: string,
}

export default function CoverImage({ title, src, slug }: CoverData) {
  const image = (
    <img
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
    />
  )
  
  return (
    <div className="sm:mx-0">
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
    </div>
  )
}
