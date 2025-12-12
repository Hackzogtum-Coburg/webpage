import PostPreview from '../components/post-preview'
import { PostsProps } from '../lib/blog-utils'

interface MoreStoriesProps extends PostsProps {
  showFirstRowLarge?: boolean;
}

export default function MoreStories({ allPosts, showFirstRowLarge = true }: MoreStoriesProps) {
  return (
    <section>
      <div className={`posts-grid gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-32 ${showFirstRowLarge ? 'posts-grid-home' : 'posts-grid-all'}`}>
        {allPosts.map((post, index) => (
          <div key={post.slug} className={showFirstRowLarge && index < 3 ? 'post-item-large' : 'post-item'}>
            <PostPreview {...post} />
          </div>
        ))}
      </div>
    </section>
  )
}