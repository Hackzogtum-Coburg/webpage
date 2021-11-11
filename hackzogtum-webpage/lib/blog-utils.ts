import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { GetStaticProps } from 'next';
import remark from 'remark'
import html from 'remark-html'
import { VFileCompatible } from 'vfile'


const postsDirectory = join(process.cwd(), '_posts');


export interface IPost {
  title: string,
  date: string,
  slug: string,
  // author: string,
  // ogImage: string,
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
  const val = data[field];
  // TODO: add proper type check
  return val as T;
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
    // ogImage: fromPostData(data, 'ogImage'),
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
  
    return {
      props: { allPosts: slicedPosts },
    }
  };
}
