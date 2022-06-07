import { GetStaticPaths, GetStaticProps } from "next";
import NewsDetail from "../../components/news/newsDetail";
import { getPostBySlug, getPosts } from "../../lib/wp/news";

const NewsPage = ({ post }: { post: any }) => {
  return <NewsDetail data={post} />;
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

  if (typeof slug === "string") post = await getPostBySlug(slug);

  return {
    props: {
      post,
    },
  };
};

export default NewsPage;
