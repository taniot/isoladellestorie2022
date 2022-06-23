import { gql } from 'graphql-request'
import { PlaceType, wpPlace, wpPlaceTipologia } from '../../store/types'
import { client } from '../client'

const qGetPlaces = gql`
  query {
    luoghi(last: 1000) {
      nodes {
        id
        title
        dettagliAccoglienza {
          indirizzo
          email
          telefono1
          telefono2
          sitoWeb
        }
        cittaLuoghi {
          nodes {
            id
            name
            slug
            dettagliCitta {
              distanzaGavoi
            }
          }
        }
        tipologieLuoghi {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  }
`

export const setLuogoGroups = (places: PlaceType[]) => {
  let currentLuogo = null
  const groups = []

  if (!places) return []

  for (const place of places) {
    if (place.city.slug !== currentLuogo) {
      groups.push({
        luogo: place.city.name,
        slug: place.city.slug,
        distanza: place.city?.dettagliCitta?.distanzaGavoi,
      })
      currentLuogo = place.city.slug
    }
  }

  return groups
}

export const getPlaces = async (tipologia?: string): Promise<PlaceType[]> => {
  const query = qGetPlaces
  if (!client) return []

  let result = []

  try {
    const data = await client.request(query)

    result = data?.luoghi?.nodes?.map((luogo: wpPlace): PlaceType => {
      return {
        id: luogo?.id,
        title: luogo?.title,
        address: luogo?.dettagliAccoglienza?.indirizzo || null,
        email: luogo?.dettagliAccoglienza?.email || null,
        phone1: luogo?.dettagliAccoglienza?.telefono1 || null,
        phone2: luogo?.dettagliAccoglienza?.telefono2 || null,
        web: luogo?.dettagliAccoglienza?.sitoWeb || null,
        city: luogo?.cittaLuoghi?.nodes[0] || null,
        tipologie:
          luogo?.tipologieLuoghi?.nodes?.map((tipologia: wpPlaceTipologia) => {
            return tipologia.slug
          }) || [],
      }
    })

    result.sort(
      (a: PlaceType, b: PlaceType) =>
        a.city?.dettagliCitta.distanzaGavoi -
          b.city?.dettagliCitta?.distanzaGavoi ||
        a.city.name.localeCompare(b.city.name)
    )

    if (tipologia) {
      result = result.filter((place: PlaceType) => {
        return place.tipologie.includes(tipologia)
      })
    }

    return result
  } catch (error) {
    return []
  }
}
