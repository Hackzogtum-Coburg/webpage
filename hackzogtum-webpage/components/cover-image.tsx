import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

export interface CoverData {
  title: string,
  src: string,
  slug: string,
}

export default function CoverImage({ title, src, slug }: CoverData) {
  // TODO: try to get rid of the pixel values and do something approprie to the surrounding container
  const image = (<Image
    src={src}
    alt={`Cover Image for ${title}`}
    width="400px" height="400px"
    objectFit='contain'
    className={cn('shadow-small', {
      'hover:shadow-medium transition-shadow duration-200': slug,
    })}
  />);

  return (
    <div className="sm:mx-0">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <a aria-label={title}>{image}</a>
      </Link>
    </div>
  );
}
