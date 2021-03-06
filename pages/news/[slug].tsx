import { GetStaticPaths, GetStaticProps } from 'next'
import NewsDetail from '../../components/news/newsDetail'
import { getPostBySlug, getPosts } from '../../lib/wp/news'
import { getTranslations } from '../../lib/wp/translations'
import { TranslationType, wpNews } from '../../store/types'
import { useContext, useEffect } from 'react'
import AppContext from '../../store/AppContext'
import Seo from '../../components/seo/seo'
import currentLocale from '../../utils/currentLocale'
const NewsPage = ({
  post,
  translations,
}: {
  post: wpNews
  translations: TranslationType[]
}) => {
  const context = useContext(AppContext)
  const { setTranslations } = context

  useEffect(() => {
    if (setTranslations) setTranslations(translations)
  }, [setTranslations, translations])
  return (
    <>
      <Seo title={post.title} />
      <NewsDetail data={post} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts(10)

  const paths = posts?.map((post: wpNews) => {
    return {
      params: {
        slug: post.slug,
      },
      locale: post.language.slug,
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug

  let post = null
  const translations = await getTranslations(currentLocale(context.locale))

  if (typeof slug === 'string') post = await getPostBySlug(slug)

  return {
    props: {
      post,
      translations,
    },
  }
}

export default NewsPage
