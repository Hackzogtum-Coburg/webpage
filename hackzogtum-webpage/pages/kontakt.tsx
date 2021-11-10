import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Contact from '../components/contact'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'

export default function info() {
  return (
    <>
      <Layout>
        <Head>
          <title>Hackzogtum-Coburg</title>
        </Head>
        <Container>
          <Intro />
          <Contact />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}