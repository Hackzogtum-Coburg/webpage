import DateFormatter from '../components/date-formatter'
import PostTitle from '../components/post-title'
import { IPost } from '../lib/blog-utils'

export default function PostHeader({ title, coverImage, date/*, author*/ }: IPost) {
  return (
    <div className="max-w-2xl mx-auto border-b border-gray-700 pb-8 mb-8">
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        {/* <Avatar name={author.name} picture={author.picture} /> */}
      </div>
      {/* <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div> */}
      <div>
        <div className="block md:hidden mb-6">
          {/* <Avatar name={author.name} picture={author.picture} /> */}
        </div>
        <div className="text-base" style={{ color: 'var(--color-text-secondary)' }}>
          <DateFormatter dateString={date} />
        </div>
      </div>
    </div>
  )
}
