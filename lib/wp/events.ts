import { gql } from "graphql-request";
import {
  EventType,
  EventTypeDataGroups,
  EventTypeGroups,
  EventTypeLuogoGroups,
  wpEvent,
} from "../../store/types";
import { client } from "../client";

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
          noteEtaRichiesta
          maxIscritti
          prenotazioneOnline
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
`;

export const setDataGroups = (eventi: EventType[]): EventTypeDataGroups[] => {
  let currentData = null;
  let groups = [];
  if (!eventi) return [];
  for (const evento of eventi) {
    if (evento.data !== currentData) {
      groups.push({
        data: evento.data,
      });
      currentData = evento.data;
    }
  }
  return groups;
};

export const setLuogoGroups = (eventi: EventType[]) => {
  let currentLuogo = null;
  let groups = [];

  if (!eventi) return [];

  for (const evento of eventi) {
    if (evento.luogo !== currentLuogo) {
      groups.push({
        luogo: evento.luogo,
        luogoName: evento.luogoName || null,
        luogoNameEn: evento.luogoNameEn || null,
        infoLuogo: evento.infoLuogo || null,
        infoLuogoEn: evento.infoLuogoEn || null,
      });
      currentLuogo = evento.luogo;
    }
  }

  return groups;
};

export const setLuogoTipologiaGroups = (
  eventi: EventType[]
): EventTypeGroups[] => {
  let currentLuogo = null;
  let currentTipologia = null;
  let groups = [];

  if (!eventi) return [];

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
          evento.tipologia === "segnaposto-a" ||
          evento.tipologia === "segnaposto-b"
            ? null
            : evento.tipologiaName,
        tipologiaNameEn:
          evento.tipologia === "segnaposto-a" ||
          evento.tipologia === "segnaposto-b"
            ? null
            : evento.tipologiaNameEn,
      });
      currentLuogo = evento.luogo;
      currentTipologia = evento.tipologia;
    }
  }

  return groups;
};

export const setOreGroups = (eventi: EventType[]) => {
  let currentOraInizio = null;
  let currentOraFine = null;
  let groups = [];

  if (!eventi) return [];

  for (const evento of eventi) {
    if (
      evento.oraInizio !== currentOraInizio ||
      evento.oraFine !== currentOraFine
    ) {
      groups.push({
        oraInizio: evento.oraInizio,
        oraFine: evento.oraFine,
      });
      currentOraInizio = evento.oraInizio;
      currentOraFine = evento.oraFine;
    }
  }

  return groups;
};

/*
/ get ALL db pages
*/
export const getEvents = async (tipologia?: string): Promise<EventType[]> => {
  const query = qGetEvents;
  if (!client) return [];
  try {
    const data = await client.request(query);
    return handleEventi(data.eventi.nodes);
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const handleEventi = (eventi: wpEvent[]): EventType[] => {
  return eventi
    .map((evento: wpEvent) => shapeEvento(evento))
    .sort(
      (a: EventType, b: EventType) =>
        a.dataOrdA - b.dataOrdA || a.dataOrdB - b.dataOrdB
    );
};

export const shapeEvento = (evento: wpEvent): EventType => {
  const dataInizio = evento?.dettaglioEvento?.oraInizio
    ? evento?.dettaglioEvento?.dataEvento +
      "T" +
      evento?.dettaglioEvento?.oraInizio +
      ":00"
    : evento?.dettaglioEvento?.dataEvento;

  const dataFine = evento?.dettaglioEvento?.oraFine
    ? evento?.dettaglioEvento?.dataEvento +
      "T" +
      evento?.dettaglioEvento?.oraFine +
      ":00"
    : evento?.dettaglioEvento?.dataEvento;

  return {
    id: evento?.id,
    title: evento?.title,
    titleEn: evento?.dettaglioEvento?.titoloEventoEn || evento?.title || null,
    data: evento?.dettaglioEvento?.dataEvento,
    oraInizio: evento?.dettaglioEvento?.oraInizio || null,
    oraFine: evento?.dettaglioEvento?.oraFine || null,
    descrizioneIt:
      changeLinkGuest(evento?.dettaglioEvento?.descrizioneEventoIt, "it") ||
      null,
    descrizioneEn:
      changeLinkGuest(evento?.dettaglioEvento?.descrizioneEventoEn, "en") ||
      changeLinkGuest(evento?.dettaglioEvento?.descrizioneEventoIt, "it") ||
      null,
    approfondimentoIt:
      changeLinkGuest(evento?.dettaglioEvento?.approfondimentoEventoIt, "it") ||
      null,
    approfondimentoEn:
      changeLinkGuest(evento?.dettaglioEvento?.approfondimentoEventoEn, "en") ||
      changeLinkGuest(evento?.dettaglioEvento?.approfondimentoEventoEn, "it") ||
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
        " " +
        evento?.dettaglioEvento?.oraInizio
    ),
    dataOrdFine: Date.parse(
      evento?.dettaglioEvento?.dataEvento +
        " " +
        evento?.dettaglioEvento?.oraFine
    ),
    dataOrdA: Date.parse(dataInizio),
    dataOrdB: Date.parse(dataFine),
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
    noteEtaRichiesta: evento?.dettaglioEvento?.noteEtaRichiesta || null,
    maxIscritti: evento?.dettaglioEvento?.maxIscritti || null,
    prenotazioneOnline: evento?.dettaglioEvento?.prenotazioneOnline || false,
    programma: evento?.dettaglioEvento?.programma || false,
  };
};

const changeLinkGuest = (text: string, language: string = "it"): string => {
  if (!text) return "";
  if (language === "it")
    return text.replaceAll(
      "https://cms2022.isoladellestorie.it/guests/",
      "/ospiti/"
    );

  if (language === "en")
    return text.replaceAll(
      "https://cms2022.isoladellestorie.it/guests/",
      "/en/guests/"
    );

  return "";
};

export const getGroupsFieldByLang = (
  group: EventTypeGroups,
  field: string,
  language: string | undefined
): string => {
  switch (field) {
    case "luogo":
      return language === "it"
        ? group.luogoName || ""
        : group.luogoNameEn
        ? group.luogoNameEn
        : group.luogoName || "";
    case "tipologia":
      return language === "it"
        ? group.tipologiaName || ""
        : group.tipologiaNameEn
        ? group.tipologiaNameEn
        : group.tipologia || "";
    default:
      return "";
  }
};

export const getGroupsLuogoFieldByLang = (
  group: EventTypeLuogoGroups,
  field: string,
  language: string | undefined
): string => {
  switch (field) {
    case "luogo":
      return language === "it"
        ? group.luogoName || ""
        : group.luogoNameEn
        ? group.luogoNameEn
        : group.luogoName || "";
    case "info":
      return language === "it"
        ? group.infoLuogo || ""
        : group.infoLuogoEn
        ? group.infoLuogoEn
        : group.infoLuogo || "";
    default:
      return "";
  }
};

export const getEventFieldByLang = (
  event: EventType,
  field: string,
  language: string | undefined
): string => {
  if (!language) language = "it";
  switch (field) {
    case "title":
      return language === "it"
        ? event.title || ""
        : event.titleEn
        ? event.titleEn
        : event.title || "";

    case "description":
      return language === "it"
        ? event.descrizioneIt || ""
        : event.descrizioneEn
        ? event.descrizioneEn
        : event.descrizioneIt || "";

    case "luogo":
      return language === "it"
        ? event.luogoName || ""
        : event.luogoNameEn
        ? event.luogoNameEn
        : event.luogoName || "";

    case "info":
      return language === "it"
        ? event.infoIt || ""
        : event.infoEn
        ? event.infoEn
        : event.infoIt || "";

    case "finanziamento":
      return language === "it"
        ? event.finanziamentoIt || ""
        : event.finanziamentoEn
        ? event.finanziamentoEn
        : event.finanziamentoIt || "";

    default:
      return "";
  }
};
