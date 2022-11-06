import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { GetStaticProps } from 'next';
import remark from 'remark'
import html from 'remark-html'
import { VFileCompatible } from 'vfile'
import { BLOG_SUBTITLE, BLOG_TITLE, BLOG_URL } from './constants';


const postsDirectory = join(process.cwd(), '_posts');


export interface IPost {
  title: string,
  date: string,
  slug: string,
  // author: string,
  ogImage: string,
  coverImage: string,
  // content_md: string,
  content_html: string,
}


export default async function markdownToHtml(markdown: VFileCompatible) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}


export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}


function fromPostData<T>(data: {[key: string]: any}, field: string): T {
  if(!data[field]){
    return '' as any as T;
  } else {
    let val = data[field];
    // TODO: add proper type check
    return val as T;
  }
}

export async function getPostBySlug(slug: string): Promise<IPost> {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const content_html = await markdownToHtml(content);

  return {
    title: fromPostData(data, 'title'),
    date: fromPostData(data, 'date'),
    slug: realSlug,
    // author: fromPostData(data, 'author'),
    ogImage: fromPostData(data, 'ogImage'),
    coverImage: fromPostData(data, 'coverImage'),
    // content_md: content,
    content_html,
  };
}

export async function getAllPosts() {
  const slugs = getPostSlugs();
  let posts = await Promise.all(slugs
    .map(async (slug) => await getPostBySlug(slug))
    // sort posts by date in descending order
    );
    posts.sort((post1, post2) => {
      const t1 = post1.date;
      const t2 = post2.date;
      return t1 > t2 ? -1 : 1;
    });
  return posts;
}


export interface PostsProps {
  allPosts: IPost[],
}

export function getAllPostsProps(from: number, to?: number): GetStaticProps<PostsProps> {
  return async (context) => {
    const allPosts = await getAllPosts()
    const slicedPosts = allPosts.slice(from, to);

    // write feed.xml file
    // TODO: figure out if this can be done without building the file in the source tree
    const rss = await generateRss(allPosts)
    fs.writeFileSync('./public/feed.xml', rss)
  
    return {
      props: { allPosts: slicedPosts },
    }
  };
}


export async function generateRssItem(post: IPost) {
  // remove relative URLs
  let cleanedContent = post.content_html.replaceAll('src="../images/', `src="${BLOG_URL}/images`)

  return `
    <item>
      <guid>${BLOG_URL}/posts/${post.slug}</guid>
      <title>${post.title}</title>
      <description>${post.title}</description>
      <link>${BLOG_URL}/posts/${post.slug}</link>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <content:encoded><![CDATA[${cleanedContent}]]></content:encoded>
    </item>
  `
}

export async function generateRss(posts: IPost[]) {
  const itemsList = await Promise.all(posts.map(generateRssItem))
  let lastDate = new Date(posts[0].date).toUTCString();

  return `
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
      <channel>
        <title>${BLOG_TITLE}</title>
        <link>${BLOG_URL}/</link>
        <description>${BLOG_SUBTITLE}</description>
        <language>en</language>
        <lastBuildDate>${lastDate}</lastBuildDate>
        <atom:link href="${BLOG_URL}/feed.xml" rel="self" type="application/rss+xml"/>
        ${itemsList.join('')}
      </channel>
    </rss>
  `
}
