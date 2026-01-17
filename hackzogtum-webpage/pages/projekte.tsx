import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Projekte from '../components/projekte'
import Head from 'next/head'

export default function projekte() {
  return (
    <>
      <Layout>
        <Head>
          <title>Hackzogtum-Coburg - Projekte</title>
        </Head>
        <Container>
          <Intro />
          <Projekte />
        </Container>
      </Layout>
    </>
  )
}
