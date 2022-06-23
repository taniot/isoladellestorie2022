import { gql } from 'graphql-request'
import { client } from '../client'
import { replaceText } from '../../utils/replaceText'
import { TranslationType, wpTranslation } from '../../store/types'

const qGetTranslations = gql`
  query {
    traduzioni(last: 1000) {
      nodes {
        id
        title
        dettagliTraduzioni {
          slugTraduzione
          linkTraduzione {
            target
            title
            url
          }
        }
        language {
          slug
        }
      }
    }
  }
`

export const getTranslations = async (): Promise<TranslationType[]> => {
  const query = qGetTranslations
  if (!client) return []

  let result: TranslationType[] = []

  try {
    const data = await client.request(query)

    result = data?.traduzioni?.nodes?.map((traduzione: wpTranslation) => {
      return {
        id: traduzione?.id,
        title: traduzione?.title,
        slug: traduzione?.dettagliTraduzioni?.slugTraduzione || null,
        link: traduzione?.dettagliTraduzioni?.linkTraduzione || null,
        language: traduzione?.language.slug || null,
      }
    })

    //console.log({ result });

    return result
  } catch (error) {
    return []
  }
}

export const getTranslation = (
  translations: TranslationType[] | undefined,
  slug: string,
  language = 'it',
  what = 'title'
): string => {
  if (!translations || !what) return ''
  const result =
    translations
      .filter((tr: TranslationType) => tr.language === language)
      .find((tr: TranslationType) => tr.slug === slug) ||
    translations
      .filter((tr: TranslationType) => tr.language === 'it')
      .find((tr: TranslationType) => tr.slug === slug) ||
    null

  if (what === 'title') return result?.title || ''
  if (what === 'link') {
    return result?.link?.url
      ? replaceText(
          result?.link?.url,
          'https://cms2022.isoladellestorie.it/',
          '/'
        )
      : '#'
  }

  return ''
}
