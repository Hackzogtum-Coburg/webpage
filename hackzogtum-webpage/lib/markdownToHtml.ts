import remark from 'remark'
import html from 'remark-html'
import { VFile } from 'vfile'

export default async function markdownToHtml(markdown: VFile) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}
