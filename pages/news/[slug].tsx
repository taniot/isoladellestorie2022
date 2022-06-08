import { GetStaticPaths, GetStaticProps } from "next";
import NewsDetail from "../../components/news/newsDetail";
import { getPostBySlug, getPosts } from "../../lib/wp/news";
import { getTranslations } from "../../lib/wp/translations";
import { Translation } from "../../store/types";
import { useContext, useEffect } from "react";
import AppContext from "../../store/AppContext";
import Head from "next/head";
const NewsPage = ({
  post,
  translations,
}: {
  post: any;
  translations: Translation[];
}) => {
  const context = useContext(AppContext);
  const { setTranslations } = context;

  useEffect(() => {
    if (setTranslations) setTranslations(translations);
  }, [setTranslations, translations]);
  return (
    <>
      <Head>
        <title>{`${post.title} - L’Isola delle Storie - dal 1 al 3 luglio 2022 a Gavoi`}</title>
      </Head>
      <NewsDetail data={post} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts(10);

  const paths = posts?.map((post: any) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;

  let post = null;
  let translations = await getTranslations();

  if (typeof slug === "string") post = await getPostBySlug(slug);

  return {
    props: {
      post,
      translations,
    },
  };
};

export default NewsPage;
