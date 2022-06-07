import { gql } from "graphql-request";
import { client } from "../client";

//queries

const qGetEvents = gql`
  query {
    eventi(last: 1000) {
      nodes {
        id
        title
        dettaglioEvento {
          dataEvento
          oraInizio
          oraFine
          titoloEventoEn
          descrizioneEventoIt
          descrizioneEventoEn
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
          }
        }
        tipologieEventi {
          nodes {
            name
            slug
          }
        }
        luoghiEventi {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const setLuogoTipologiaGroups = (eventi: any) => {
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
        luogoName: evento.luogoName,
        tipologiaName:
          evento.tipologia === "segnaposto-a" ||
          evento.tipologia === "segnaposto-b"
            ? null
            : evento.tipologiaName,
      });
      currentLuogo = evento.luogo;
      currentTipologia = evento.tipologia;
    }
  }

  return groups;
};

export const setOreGroups = (eventi: any) => {
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
export const getEvents = async (tipologia?: string) => {
  const query = qGetEvents;
  if (!client) return [];

  let result = [];

  try {
    const data = await client.request(query);

    result = data?.eventi?.nodes.map((evento: any) => {
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
        titleEn:
          evento?.dettaglioEvento?.titoloEventoEn || evento?.title || null,
        data: evento?.dettaglioEvento?.dataEvento,
        oraInizio: evento?.dettaglioEvento?.oraInizio || null,
        oraFine: evento?.dettaglioEvento?.oraFine || null,
        descrizioneIt:
          changeLinkGuest(evento?.dettaglioEvento?.descrizioneEventoIt) || null,
        descrizioneEn:
          evento?.dettaglioEvento?.descrizioneEventoEn ||
          evento?.dettaglioEvento?.descrizioneEventoIt ||
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
        tipologiaName: evento?.tipologieEventi?.nodes[0]?.name || null,
        luogoName: evento?.luoghiEventi?.nodes[0]?.name || null,
        eventoPrincipale: evento?.dettaglioEvento?.eventoPrincipale || false,
        nascondiOraInizio: evento?.dettaglioEvento?.nascondiOraInizio || false,
        nascondiTitolo: evento?.dettaglioEvento?.nascondiTitolo || false,
        etaRichiesta: evento?.dettaglioEvento?.etaRichiesta || null,
        noteEtaRichiesta: evento?.dettaglioEvento?.noteEtaRichiesta || null,
        maxIscritti: evento?.dettaglioEvento?.maxIscritti || null,
        prenotazioneOnline:
          evento?.dettaglioEvento?.prenotazioneOnline || false,
      };
    });

    result.sort(
      (a: any, b: any) => a.dataOrdA - b.dataOrdA || a.dataOrdB - b.dataOrdB
    );
    return result;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

const changeLinkGuest = (text: string) => {
  return text.replaceAll(
    "https://cms2022.isoladellestorie.it/guests/",
    "/ospiti/"
  );
};
