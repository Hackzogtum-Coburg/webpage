import { useRouter } from 'next/router'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts, IPost } from '../../lib/blog-utils'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'

interface PostProps {
  post: IPost,
}

export default function Post({ post }: PostProps) {
  const router = useRouter()
 
  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title}
                </title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
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
