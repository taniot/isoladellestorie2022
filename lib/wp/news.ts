import { gql } from "graphql-request";
import { client } from "../client";

//queries

const qGetPosts = gql`
  query getNews($locale: LanguageCodeFilterEnum, $count: Int) {
    posts(
      where: { language: $locale, orderby: { field: DATE, order: DESC } }
      last: $count
    ) {
      nodes {
        id
        title
        excerpt
        content
        date
        featuredImage {
          node {
            guid
          }
        }
      }
    }
  }
`;

/*
/ get ALL db pages
*/
export const getPosts = async (locale: string = "IT", count: number = 1) => {
  const query = qGetPosts;
  if (!client) return null;

  const variables = {
    locale,
    count,
  };

  try {
    const data = await client.request(query, variables);
    return data?.posts?.nodes;
  } catch (error) {
    console.log({ error });
    return null;
  }
};
