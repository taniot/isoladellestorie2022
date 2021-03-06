import { gql } from 'graphql-request'
import { GuestType, wpGuest } from '../../store/types'
import { client } from '../client'
import { handleEventi } from './events'

//queries

const qGetGuests = gql`
  query getGuests {
    ospiti(first: 100) {
      nodes {
        title
        slug
        dettagliOspite {
          nome
          cognome
          ordinamento
          jobTitleIt
          jobTitleEn
          descrizioneIt
          descrizioneEn
        }
        featuredImage {
          node {
            guid
          }
        }
      }
    }
  }
`

const qGetGuest = gql`
  query getGuest($slug: ID!) {
    ospite(id: $slug, idType: SLUG) {
      title
      slug
      dettagliOspite {
        nome
        cognome
        ordinamento
        jobTitleIt
        jobTitleEn
        descrizioneIt
        descrizioneEn
        ospiteEvento {
          ... on Evento {
            id
            title
            dettaglioEvento {
              dataEvento
              oraInizio
              oraFine
              titoloEventoEn
              descrizioneEventoIt
              descrizioneEventoEn
              approfondimentoEventoIt
              approfondimentoEventoEn
              infoEventoIt
              infoEventoEn
              eventoPrincipale
              nascondiOraInizio
              finanziamentoIt
              finanziamentoEn
              nascondiTitolo
              etaRichiesta
              noteEtaRichiesta
              maxIscritti
              prenotazioneOnline
              eventoAnnullato
              motivazioneAnnullatoIt
              motivazioneAnnullatoEn
            }
            categorieEventi {
              nodes {
                name
                slug
              }
            }
            tipologieEventi {
              nodes {
                name
                slug
                dettagliTipologieEvento {
                  nomeTipologiaEn
                }
              }
            }
            luoghiEventi {
              nodes {
                name
                slug
                dettagliLuoghiEvento {
                  nomeLuogoEn
                  infoLuogo
                  infoLuogoEn
                }
              }
            }
          }
        }
      }
      featuredImage {
        node {
          guid
        }
      }
    }
  }
`

export const getGuestBySlug = async (
  slug: string
): Promise<GuestType | null> => {
  const query = qGetGuest
  const variables = {
    slug,
  }

  try {
    const { ospite } = await client.request(query, variables)

    //console.log({ ospite });

    return {
      title: ospite?.title,
      nome: ospite?.dettagliOspite?.nome,
      cognome: ospite?.dettagliOspite?.cognome,
      slug: ospite?.slug,
      ordinamento: ospite.dettagliOspite.ordinamento,
      image: ospite?.featuredImage?.node?.guid || null,
      jobTitleIt: ospite?.dettagliOspite?.jobTitleIt || null,
      jobTitleEn: ospite?.dettagliOspite?.jobTitleEn || null,
      descrizioneIt: ospite?.dettagliOspite?.descrizioneIt || null,
      descrizioneEn: ospite?.dettagliOspite?.descrizioneEn || null,
      eventi:
        ospite?.dettagliOspite?.ospiteEvento?.length > 0
          ? handleEventi(ospite?.dettagliOspite?.ospiteEvento)
          : [],
    }
  } catch (error) {
    console.log({ error })
    return null
  }
}

/*
/ get ALL db pages
*/
export const getGuests = async (): Promise<GuestType[]> => {
  const query = qGetGuests

  if (!client) return []

  try {
    const data = await client.request(query)

    const result = data?.ospiti?.nodes.map((item: wpGuest): GuestType => {
      return {
        title: item?.title,
        slug: item?.slug,
        ordinamento: item.dettagliOspite.ordinamento,
        image: item?.featuredImage?.node?.guid || null,
        jobTitleIt: item?.dettagliOspite?.jobTitleIt || null,
        jobTitleEn: item?.dettagliOspite?.jobTitleEn || null,
        nome: item?.dettagliOspite?.nome || null,
        cognome: item?.dettagliOspite?.cognome || null,
        descrizioneIt: item.dettagliOspite.descrizioneIt || null,
        descrizioneEn: item.dettagliOspite.descrizioneEn || null,
        eventi: [],
      }
    })

    // sort by name
    result.sort(function (
      a: { ordinamento: string },
      b: { ordinamento: string }
    ) {
      const nameA = a.ordinamento.toUpperCase() // ignore upper and lowercase
      const nameB = b.ordinamento.toUpperCase() // ignore upper and lowercase
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      // names must be equal
      return 0
    })

    return result
  } catch (error) {
    console.log({ error })
    return []
  }
}

export const getGuestFieldByLang = (
  guest: GuestType,
  field: string,
  language: string | undefined
): string => {
  if (!language) language = 'it'
  switch (field) {
    case 'jobTitle':
      return language === 'it'
        ? guest.jobTitleIt || ''
        : guest.jobTitleEn
        ? guest.jobTitleEn
        : guest.jobTitleIt || ''
    case 'description':
      return language === 'it'
        ? guest.descrizioneIt || ''
        : guest.descrizioneEn
        ? guest.descrizioneEn
        : '' || ''

    default:
      return ''
  }
}
