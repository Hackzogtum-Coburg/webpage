import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { getAllPostsProps, PostsProps } from '../lib/blog-utils'


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
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = getAllPostsProps(20);
