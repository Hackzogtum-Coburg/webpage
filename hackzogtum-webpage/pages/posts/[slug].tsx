import { useRouter } from 'next/router'
import Link from 'next/link'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts, IPost } from '../../lib/blog-utils'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

interface PostProps {
  post: IPost,
}

export default function Post({ post }: PostProps) {
  const router = useRouter()
 
  return (
    <Layout>
      <Container>
        <Link href="/" 
              className="inline-flex items-center gap-2 mb-8 mt-8 text-lg hover:text-primary transition-colors"
              style={{ 
                color: 'var(--color-text-secondary)',
                textDecoration: 'none'
              }}>
          <FontAwesomeIcon icon={faArrowLeft} className="text-primary" />
          <span>Zurück zur Übersicht</span>
        </Link>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title}
                </title>
                <meta property="og:image" content={post.ogImage} />
              </Head>
              <PostHeader {...post} />
              <PostBody {...post} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const query = context.params;
  if (query) {
    const slug = query.slug;
    if (typeof(slug) === 'string') {
      const post = await getPostBySlug(slug);
      return {
        props: {
          post,
        },
      };
    }
  }

  // display 404
  return {
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts()

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
