import { gql } from 'graphql-request'
import { wpNews } from '../../store/types'
import { client } from '../client'

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
            caption
          }
        }
        dettagliArticoli {
          comunicatoStampa {
            id
            guid
          }
        }
        language {
          slug
        }
      }
    }
  }
`

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
          caption
        }
      }
      dettagliArticoli {
        comunicatoStampa {
          id
          guid
        }
      }
      language {
        slug
      }
    }
  }
`

/*
/ get ALL db pages
*/
export const getPosts = async (
  count = 1,
  locale = 'ALL'
): Promise<wpNews[]> => {
  const query = qGetPosts
  if (!client) return []

  const variables = {
    locale,
    count,
  }

  try {
    const data = await client.request(query, variables)
    return data?.posts?.nodes
  } catch (error) {
    console.log({ error })
    return []
  }
}

export const getPostBySlug = async (id: string): Promise<wpNews | null> => {
  const query = qGestPostBySlug
  if (!client) return null

  const variables = {
    id,
  }

  try {
    const data = await client.request(query, variables)
    return data?.post
  } catch (error) {
    console.log({ error })
    return null
  }
}
