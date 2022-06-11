import DateFormatter from '../components/date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import { IPost } from '../lib/blog-utils'

export default function PostPreview({
  title,
  coverImage,
  date,
  // excerpt,
  // author,
  slug,
}: IPost) {
  return (
    <div className="postPreviewContainer">
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      {/* <p className="text-lg leading-relaxed mb-4">{excerpt}</p> */}
    </div>
  )
}
