import PostPreview from '../components/post-preview'
import { PostsProps } from '../lib/blog-utils'

export default function MoreStories({ allPosts }: PostsProps) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {allPosts.map((post) => (
          <PostPreview {...post} key={post.slug} />
          //   key={post.slug}
          //   title={post.title}
          //   coverImage={post.coverImage}
          //   date={post.date}
          //   // author={post.author}
          //   slug={post.slug}
          //   // excerpt={post.excerpt}
          // />
        ))}
      </div>
    </section>
  )
}
