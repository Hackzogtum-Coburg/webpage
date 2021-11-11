import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Beitritt from '../components/beitritt'
import Head from 'next/head'

export default function beitritt() {
  return (
    <>
      <Layout>
        <Head>
          <title>Hackzogtum-Coburg</title>
        </Head>
        <Container>
          <Intro />
          <Beitritt />
        </Container>
      </Layout>
    </>
  )
}
