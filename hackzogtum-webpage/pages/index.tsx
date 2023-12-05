import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsProps, PostsProps } from '../lib/blog-utils'
import Head from 'next/head'
import Link from 'next/link'

export default function Index({ allPosts }: PostsProps) {
  return (
    <>
      <Layout>
        <Head>
          <title>Hackzogtum-Coburg</title>
        </Head>
        <Container>
          <Intro />
          
          {allPosts.length > 0 && <MoreStories allPosts={allPosts} />}
          <Link href="/showMorePosts" className="underline hover:text-success duration-200 transition-colors">
            <div className="readMore">SHOW MORE</div>
          </Link>
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = getAllPostsProps(0, 20);
