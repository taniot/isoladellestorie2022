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

export const ProgramFormat = (data: any) => {
  console.log(data);
};

/*
/ get ALL db pages
*/
export const getEvents = async (tipologia?: string) => {
  const query = qGetEvents;
  if (!client) return null;

  let result = null;

  try {
    const data = await client.request(query);

    result = data.eventi.nodes.map((evento: any) => {
      return {
        id: evento?.id,
        title: evento?.title,
        titleEn:
          evento?.dettaglioEvento?.titoloEventoEn || evento?.title || null,
        data: evento?.dettaglioEvento?.dataEvento,
        oraInizio: evento?.dettaglioEvento?.oraInizio || null,
        oraFine: evento?.dettaglioEvento?.oraFine || null,
        descrizioneIt: evento?.dettaglioEvento?.descrizioneEventoIt || null,
        descrizioneEn:
          evento?.dettaglioEvento?.descrizioneEventoEn ||
          evento?.dettaglioEvento?.descrizioneEventoIt ||
          null,
        infoIt: evento?.dettaglioEvento?.infoEventoIt,
        infoEn:
          evento?.dettaglioEvento.infoEventoEn ||
          evento?.dettaglioEvento?.infoEventoIt ||
          null,
        dataOrd: Date.parse(
          evento?.dettaglioEvento?.dataEvento +
            " " +
            evento?.dettaglioEvento?.oraInizio
        ),
        categoria: evento?.categorieEventi?.nodes[0]?.name || null,
        tipologia: evento?.tipologieEventi?.nodes[0]?.name || null,
        luogo: evento?.luoghiEventi?.nodes[0]?.name || null,
        eventoPrincipale: evento?.dettaglioEvento?.eventoPrincipale || false,
        nascondiOraInizio: evento?.dettaglioEvento?.nascondiOraInizio || false,
      };
    });

    // if (tipologia) {
    //   result = result.filter((sponsor: any) => sponsor.type === tipologia);
    // }

    result.sort((a: any, b: any) => a.dataOrd - b.dataOrd);
    console.log({ result });
    return result;
  } catch (error) {
    console.log({ error });
    return null;
  }
};
