import { gql } from "graphql-request";
import { client } from "../client";

//queries

const qGetPosts = gql`
  query ($locale: LanguageCodeFilterEnum, $count: Int) {
    posts(
      where: { language: $locale, orderby: { field: DATE, order: DESC } }
      first: $count
    ) {
      nodes {
        id
        title
        excerpt
        content
        date
        uri
        slug
        featuredImage {
          node {
            guid
          }
        }
        dettagliArticoli {
          comunicatoStampa {
            id
            guid
          }
        }
      }
    }
  }
`;

const qGestPostBySlug = gql`
  query ($id: ID!) {
    post(idType: SLUG, id: $id) {
      id
      title
      excerpt
      content
      featuredImage {
        node {
          guid
        }
      }
      dettagliArticoli {
        comunicatoStampa {
          id
          guid
        }
      }
    }
  }
`;

/*
/ get ALL db pages
*/
export const getPosts = async (count: number = 1, locale: string = "IT") => {
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

export const getPostBySlug = async (id: string) => {
  const query = qGestPostBySlug;
  if (!client) return null;

  const variables = {
    id,
  };

  try {
    const data = await client.request(query, variables);
    return data?.post;
  } catch (error) {
    console.log({ error });
    return null;
  }
};
