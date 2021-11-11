import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Info from '../components/info'
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
          <Info />
        </Container>
      </Layout>
    </>
  )
}
