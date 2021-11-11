import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsProps, PostsProps } from '../lib/blog-utils'
import Head from 'next/head'
import Link from 'next/link'

export default function Index({ allPosts }: PostsProps) {
  const morePosts = allPosts.slice(0, 20);
  return (
    <>
      <Layout>
        <Head>
          <title>Hackzogtum-Coburg</title>
        </Head>
        <Container>
          <Intro />
          
          {morePosts.length > 0 && <MoreStories allPosts={morePosts} />}
          <Link href="/showMorePosts">
            <a className="underline hover:text-success duration-200 transition-colors">
              <div className="readMore">SHOW MORE</div>
            </a>
          </Link>
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = getAllPostsProps(0, 20);
