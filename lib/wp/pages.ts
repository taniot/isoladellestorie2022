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
      parent {
        node {
          ... on Page {
            title
            children {
              nodes {
                id
                uri
                ... on Page {
                  dettagliPagina {
                    template
                    dateEventi
                  }
                }
              }
            }
          }
        }
      }
      dettagliPagina {
        template
        tipologiaAccoglienza {
          slug
        }
        categoriaEventi {
          slug
        }
        dateEventi
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
    //return data?.page;

    let setChildren = [];

    if (data?.page?.parent?.node?.children) {
      const pageChildren = data?.page?.parent?.node?.children.nodes;

      setChildren = pageChildren.map((child: any) => {
        return {
          id: child?.id,
          uri: child?.uri,
          template: child?.dettagliPagina?.template || null,
          dateEventi: child?.dettagliPagina?.dateEventi || null,
        };
      });
    }
    return {
      id: data?.page?.id || null,
      title: data?.page?.title || null,
      content: data?.page?.content || null,
      template: data?.page?.dettagliPagina?.template || null,
      parentTitle: data?.page?.parent?.node?.title || null,
      parent: {
        title: data?.page?.parent?.node?.title || null,
        children: setChildren,
      },
      accoglienza: {
        tipologia:
          data?.page?.dettagliPagina?.tipologiaAccoglienza?.slug || null,
      },
      eventi: {
        categoria: data?.page?.dettagliPagina?.categoriaEventi?.slug || null,
        data: data?.page?.dettagliPagina?.dateEventi || null,
      },
    };
  } catch (error) {
    console.log({ error });
    return null;
  }
};
