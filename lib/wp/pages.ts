import { gql } from "graphql-request";
import { client } from "../client";

//queries

const qGetPages = gql`
  query getPages {
    pages(where: { language: ALL }, first: 100) {
      nodes {
        uri
        language {
          slug
        }
      }
    }
  }
`;

const qGetPageByURI = gql`
  query getPageByURI($uri: ID!) {
    page(idType: URI, id: $uri) {
      id
      title
      content
      dettagliPagina {
        template
        tipologiaAccoglienza {
          slug
        }
      }
    }
  }
`;

/*
/ get ALL db pages
*/
export const getPages = async (locale?: string) => {
  const query = qGetPages;
  if (!client) return null;

  try {
    const data = await client.request(query);
    return data?.pages?.nodes;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const getPageByURI = async (uri: string) => {
  const query = qGetPageByURI;
  const variables = {
    uri,
  };

  try {
    const data = await client.request(query, variables);
    return data?.page;
  } catch (error) {
    console.log({ error });
    return null;
  }
};
