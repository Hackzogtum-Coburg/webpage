import { IPost } from '../lib/blog-utils'
import markdownStyles from './markdown-styles.module.css'

export default function PostBody({ content_html }: IPost) {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content_html }}
      />
    </div>
  )
}
