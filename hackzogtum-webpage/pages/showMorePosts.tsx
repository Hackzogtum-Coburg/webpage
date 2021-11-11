import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { getAllPostsProps, PostsProps } from '../lib/blog-utils'


export default function Index({ allPosts }: PostsProps) {
  const morePosts = allPosts.slice(20);
  return (
    <>
      <Layout>
        <Head>
          <title>Hackzogtum-Coburg</title>
        </Head>
        <Container>
          <Intro />
          
          {morePosts.length > 0 && <MoreStories allPosts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = getAllPostsProps(20);
