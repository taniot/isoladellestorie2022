import { gql } from 'graphql-request'
import { format } from 'date-fns'
import it from 'date-fns/locale/it'
import {
  EventType,
  EventTypeDataGroups,
  EventTypeGroups,
  EventTypeLuogoGroups,
  wpEvent,
} from '../../store/types'
import { client } from '../client'

//queries

const qGetEvents = gql`
  query {
    eventi(last: 1000) {
      nodes {
        id
        title
        dettaglioEvento {
          programma
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
          etaRichiestaEn
          noteEtaRichiesta
          noteEtaRichiestaEn
          maxIscritti
          maxIscrittiEn
          prenotazioneOnline
          eventoAnnullato
          motivazioneAnnullatoIt
          motivazioneAnnullatoEn
          streaming
          urlStreaming
          urlYoutube
        }
        categorieEventi {
          nodes {
            name
            slug
            dettagliCategorieEvento {
              nomeCategoriaEn
            }
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
`

export const setDataGroups = (eventi: EventType[]): EventTypeDataGroups[] => {
  let currentData = null
  const groups = []
  if (!eventi) return []
  for (const evento of eventi) {
    if (evento.data !== currentData) {
      groups.push({
        data: evento.data,
      })
      currentData = evento.data
    }
  }
  return groups
}

export const setLuogoGroups = (eventi: EventType[]) => {
  let currentLuogo = null
  const groups = []

  if (!eventi) return []

  for (const evento of eventi) {
    if (evento.luogo !== currentLuogo) {
      groups.push({
        luogo: evento.luogo,
        luogoName: evento.luogoName || null,
        luogoNameEn: evento.luogoNameEn || null,
        infoLuogo: evento.infoLuogo || null,
        infoLuogoEn: evento.infoLuogoEn || null,
      })
      currentLuogo = evento.luogo
    }
  }

  return groups
}

export const setLuogoTipologiaGroups = (
  eventi: EventType[]
): EventTypeGroups[] => {
  let currentLuogo = null
  let currentTipologia = null
  const groups = []

  if (!eventi) return []

  for (const evento of eventi) {
    if (
      evento.luogo !== currentLuogo ||
      evento.tipologia !== currentTipologia
    ) {
      groups.push({
        luogo: evento.luogo,
        tipologia: evento.tipologia,
        luogoName: evento.luogoName || null,
        luogoNameEn: evento.luogoNameEn || null,
        tipologiaName:
          evento.tipologia === 'segnaposto-a' ||
          evento.tipologia === 'segnaposto-b'
            ? null
            : evento.tipologiaName,
        tipologiaNameEn:
          evento.tipologia === 'segnaposto-a' ||
          evento.tipologia === 'segnaposto-b'
            ? null
            : evento.tipologiaNameEn,
      })
      currentLuogo = evento.luogo
      currentTipologia = evento.tipologia
    }
  }

  return groups
}

export const setOreGroups = (eventi: EventType[]) => {
  let currentOraInizio = null
  let currentOraFine = null
  const groups = []

  if (!eventi) return []

  for (const evento of eventi) {
    if (
      evento.oraInizio !== currentOraInizio ||
      evento.oraFine !== currentOraFine
    ) {
      groups.push({
        oraInizio: evento.oraInizio,
        oraFine: evento.oraFine,
      })
      currentOraInizio = evento.oraInizio
      currentOraFine = evento.oraFine
    }
  }

  return groups
}

/*
/ get ALL db pages
*/
export const getEvents = async (): Promise<EventType[]> => {
  const query = qGetEvents
  if (!client) return []
  try {
    const data = await client.request(query)
    return handleEventi(data.eventi.nodes)
  } catch (error) {
    console.log({ error })
    return []
  }
}

export const handleEventi = (eventi: wpEvent[]): EventType[] => {
  return eventi
    .map((evento: wpEvent) => shapeEvento(evento))
    .sort(
      (a: EventType, b: EventType) =>
        a.dataOrdA - b.dataOrdA || a.dataOrdB - b.dataOrdB
    )
}

export const shapeEvento = (evento: wpEvent): EventType => {
  const dataInizio = evento?.dettaglioEvento?.oraInizio
    ? evento?.dettaglioEvento?.dataEvento +
      'T' +
      evento?.dettaglioEvento?.oraInizio +
      ':00'
    : evento?.dettaglioEvento?.dataEvento

  const dataFine = evento?.dettaglioEvento?.oraFine
    ? evento?.dettaglioEvento?.dataEvento +
      'T' +
      evento?.dettaglioEvento?.oraFine +
      ':00'
    : evento?.dettaglioEvento?.dataEvento

  return {
    id: evento?.id,
    title: evento?.title,
    titleEn: evento?.dettaglioEvento?.titoloEventoEn || evento?.title || null,
    data: evento?.dettaglioEvento?.dataEvento,
    oraInizio: evento?.dettaglioEvento?.oraInizio || null,
    oraFine: evento?.dettaglioEvento?.oraFine || null,
    descrizioneIt:
      changeLinkGuest(evento?.dettaglioEvento?.descrizioneEventoIt, 'it') ||
      null,
    descrizioneEn:
      changeLinkGuest(evento?.dettaglioEvento?.descrizioneEventoEn, 'en') ||
      changeLinkGuest(evento?.dettaglioEvento?.descrizioneEventoIt, 'en') ||
      null,
    approfondimentoIt:
      changeLinkGuest(evento?.dettaglioEvento?.approfondimentoEventoIt, 'it') ||
      null,
    approfondimentoEn:
      changeLinkGuest(evento?.dettaglioEvento?.approfondimentoEventoEn, 'en') ||
      changeLinkGuest(evento?.dettaglioEvento?.approfondimentoEventoEn, 'en') ||
      null,
    infoIt: evento?.dettaglioEvento?.infoEventoIt,
    infoEn:
      evento?.dettaglioEvento.infoEventoEn ||
      evento?.dettaglioEvento?.infoEventoIt ||
      null,
    finanziamentoIt: evento?.dettaglioEvento?.finanziamentoIt,
    finanziamentoEn:
      evento?.dettaglioEvento.finanziamentoEn ||
      evento?.dettaglioEvento?.finanziamentoIt ||
      null,
    dataOrd: Date.parse(
      evento?.dettaglioEvento?.dataEvento +
        ' ' +
        evento?.dettaglioEvento?.oraInizio
    ),
    dataOrdFine: Date.parse(
      evento?.dettaglioEvento?.dataEvento +
        ' ' +
        evento?.dettaglioEvento?.oraFine
    ),
    dataOrdA: Date.parse(new Date(dataInizio).toISOString()),
    dataOrdB: Date.parse(new Date(dataFine).toISOString()),
    categoria: evento?.categorieEventi?.nodes[0]?.slug || null,
    tipologia: evento?.tipologieEventi?.nodes[0]?.slug || null,
    luogo: evento?.luoghiEventi?.nodes[0]?.slug || null,
    categoriaName: evento?.categorieEventi?.nodes[0]?.name || null,
    categoriaNameEn:
      evento?.categorieEventi?.nodes[0]?.dettagliCategorieEvento
        ?.nomeCategoriaEn ||
      evento?.categorieEventi?.nodes[0]?.name ||
      null,
    tipologiaName: evento?.tipologieEventi?.nodes[0]?.name || null,
    tipologiaNameEn:
      evento?.tipologieEventi?.nodes[0]?.dettagliTipologieEvento
        ?.nomeTipologiaEn ||
      evento?.tipologieEventi?.nodes[0]?.name ||
      null,
    luogoName: evento?.luoghiEventi?.nodes[0]?.name || null,
    luogoNameEn:
      evento?.luoghiEventi?.nodes[0]?.dettagliLuoghiEvento?.nomeLuogoEn ||
      evento?.luoghiEventi?.nodes[0]?.name ||
      null,
    infoLuogo:
      evento?.luoghiEventi?.nodes[0]?.dettagliLuoghiEvento?.infoLuogo || null,
    infoLuogoEn:
      evento?.luoghiEventi?.nodes[0]?.dettagliLuoghiEvento?.infoLuogoEn ||
      evento?.luoghiEventi?.nodes[0]?.dettagliLuoghiEvento?.infoLuogo ||
      null,
    eventoPrincipale: evento?.dettaglioEvento?.eventoPrincipale || false,
    nascondiOraInizio: evento?.dettaglioEvento?.nascondiOraInizio || false,
    nascondiTitolo: evento?.dettaglioEvento?.nascondiTitolo || false,
    etaRichiesta: evento?.dettaglioEvento?.etaRichiesta || null,
    etaRichiestaEn: evento?.dettaglioEvento?.etaRichiestaEn || null,
    noteEtaRichiesta: evento?.dettaglioEvento?.noteEtaRichiesta || null,
    noteEtaRichiestaEn: evento?.dettaglioEvento?.noteEtaRichiestaEn || null,
    maxIscritti: evento?.dettaglioEvento?.maxIscritti || null,
    maxIscrittiEn: evento?.dettaglioEvento?.maxIscrittiEn || null,
    prenotazioneOnline: evento?.dettaglioEvento?.prenotazioneOnline || false,
    programma: evento?.dettaglioEvento?.programma || false,
    eventoAnnullato: evento.dettaglioEvento.eventoAnnullato || false,
    motivazioneAnnullatoIt: evento.dettaglioEvento.motivazioneAnnullatoIt,
    motivazioneAnnullatoEn: evento.dettaglioEvento.motivazioneAnnullatoEn,
    streaming: evento.dettaglioEvento.streaming || false,
    urlStreaming: evento.dettaglioEvento.urlStreaming || null,
    urlYoutube: evento.dettaglioEvento.urlYoutube || null,
  }
}

const changeLinkGuest = (text: string, language = 'it'): string => {
  if (!text) return ''
  if (language === 'it')
    return text.replaceAll(
      'https://cms2022.isoladellestorie.it/guests/',
      '/ospiti/'
    )

  if (language === 'en')
    return text.replaceAll(
      'https://cms2022.isoladellestorie.it/guests/',
      '/en/guests/'
    )

  return text
}

export const getGroupsFieldByLang = (
  group: EventTypeGroups,
  field: string,
  language: string | undefined
): string => {
  switch (field) {
    case 'luogo':
      return language === 'it'
        ? group.luogoName || ''
        : group.luogoNameEn
        ? group.luogoNameEn
        : group.luogoName || ''
    case 'tipologia':
      return language === 'it'
        ? group.tipologiaName || ''
        : group.tipologiaNameEn
        ? group.tipologiaNameEn
        : group.tipologiaName || ''
    default:
      return ''
  }
}

export const getGroupsLuogoFieldByLang = (
  group: EventTypeLuogoGroups,
  field: string,
  language: string | undefined
): string => {
  switch (field) {
    case 'luogo':
      return language === 'it'
        ? group.luogoName || ''
        : group.luogoNameEn
        ? group.luogoNameEn
        : group.luogoName || ''
    case 'info':
      return language === 'it'
        ? group.infoLuogo || ''
        : group.infoLuogoEn
        ? group.infoLuogoEn
        : group.infoLuogo || ''
    default:
      return ''
  }
}

export const getEventFieldByLang = (
  event: EventType,
  field: string,
  language: string | undefined
): string => {
  if (!language) language = 'it'
  switch (field) {
    case 'title':
      return language === 'it'
        ? event.title || ''
        : event.titleEn
        ? event.titleEn
        : event.title || ''

    case 'description':
      return language === 'it'
        ? event.descrizioneIt || ''
        : event.descrizioneEn
        ? event.descrizioneEn
        : event.descrizioneIt || ''

    case 'luogo':
      return language === 'it'
        ? event.luogoName || ''
        : event.luogoNameEn
        ? event.luogoNameEn
        : event.luogoName || ''

    case 'info':
      return language === 'it'
        ? event.infoIt || ''
        : event.infoEn
        ? event.infoEn
        : event.infoIt || ''

    case 'approfondimento':
      return language === 'it'
        ? event.approfondimentoIt || ''
        : event.approfondimentoEn
        ? event.approfondimentoEn
        : event.approfondimentoIt || ''

    case 'finanziamento':
      return language === 'it'
        ? event.finanziamentoIt || ''
        : event.finanziamentoEn
        ? event.finanziamentoEn
        : event.finanziamentoIt || ''

    case 'categoria':
      return language === 'it'
        ? event.categoriaName || ''
        : event.categoriaNameEn
        ? event.categoriaNameEn
        : event.categoriaName || ''

    case 'tipologia':
      return language === 'it'
        ? event.tipologiaName || ''
        : event.tipologiaNameEn
        ? event.tipologiaNameEn
        : event.tipologiaName || ''

    case 'luogo':
      return language === 'it'
        ? event.luogoName || ''
        : event.luogoNameEn
        ? event.luogoNameEn
        : event.luogoName || ''

    case 'info_luogo':
      return language === 'it'
        ? event.infoLuogo || ''
        : event.infoLuogoEn
        ? event.infoLuogoEn
        : event.infoLuogo || ''

    case 'eta_richiesta':
      return language === 'it'
        ? event.etaRichiesta || ''
        : event.etaRichiestaEn
        ? event.etaRichiestaEn
        : event.etaRichiesta || ''

    case 'note_eta_richiesta':
      return language === 'it'
        ? event.noteEtaRichiesta || ''
        : event.noteEtaRichiestaEn
        ? event.noteEtaRichiestaEn
        : event.noteEtaRichiesta || ''

    case 'max_iscritti':
      return language === 'it'
        ? event.maxIscritti || ''
        : event.maxIscrittiEn
        ? event.maxIscrittiEn
        : event.maxIscritti || ''

    case 'annullato':
      return language === 'it'
        ? event.motivazioneAnnullatoIt || ''
        : event.motivazioneAnnullatoEn
        ? event.motivazioneAnnullatoEn
        : event.motivazioneAnnullatoIt || ''

    case 'date_formatted':
      return language === 'it'
        ? `${format(event.dataOrdA, 'd MMMM', { locale: it })} ore ${' '}
          ${format(event.dataOrdA, 'H:mm', { locale: it })}`
        : `${format(event.dataOrdA, 'd MMMM')} 
          ${format(event.dataOrdA, 'h:mm aaa')}`

    /*

      categoriaName: string | null;
  categoriaNameEn: string | null;
  tipologiaName: string | null;
  tipologiaNameEn: string | null;
  luogoName: string | null;
  luogoNameEn: string | null;
  infoLuogo: string | null;
  infoLuogoEn: string | null;
  eventoPrincipale: boolean;
  nascondiOraInizio: boolean;
  nascondiTitolo: boolean;
  etaRichiesta: string | null;
  etaRichiestaEn: string | null;
  noteEtaRichiesta: string | null;
  noteEtaRichiestaEn: string | null;
  maxIscritti: string | null;
  maxIscrittiEn: string | null;

  */

    default:
      return ''
  }
}
