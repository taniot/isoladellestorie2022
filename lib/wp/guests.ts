import { gql } from "graphql-request";
import { client } from "../client";
import { faker } from "@faker-js/faker";
import slugify from "slugify";
import { Guest, wpGuest } from "../../store/types";

faker.locale = "it";

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
`;

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
            title
            categorieEventi {
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
            tipologieEventi {
              nodes {
                name
                slug
              }
            }
            dettaglioEvento {
              descrizioneEventoIt
              descrizioneEventoEn
              dataEvento
              oraInizio
              oraFine
              nascondiTitolo
              nascondiOraInizio
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
`;

export const getGuestBySlug = async (slug: string) => {
  const query = qGetGuest;
  const variables = {
    slug,
  };

  try {
    const { ospite } = await client.request(query, variables);
    return {
      title: ospite?.title,
      nome: ospite.dettagliOspite.nome,
      cognome: ospite.dettagliOspite.cognome,
      slug: ospite?.slug,
      ordinamento: ospite.dettagliOspite.ordinamento,
      image: ospite?.featuredImage?.node?.guid || null,
      jobTitleIt: ospite?.dettagliOspite?.jobTitleIt || null,
      jobTitleEn: ospite?.dettagliOspite?.jobTitleEn || null,
      descrizioneIt: ospite?.dettagliOspite?.descrizioneIt || null,
      descrizioneEn: ospite?.dettagliOspite?.descrizioneEn || null,
      eventi: ospite?.dettagliOspite?.ospiteEvento || [],
    };
  } catch (error) {
    console.log({ error });
    return null;
  }
};

/*
/ get ALL db pages
*/
export const getGuests = async () => {
  const query = qGetGuests;

  if (!client) return [];

  try {
    const data = await client.request(query);

    let result = data?.ospiti?.nodes.map((item: wpGuest): Guest => {
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
      };
    });

    // sort by name
    result.sort(function (
      a: { ordinamento: string },
      b: { ordinamento: string }
    ) {
      const nameA = a.ordinamento.toUpperCase(); // ignore upper and lowercase
      const nameB = b.ordinamento.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });

    return result;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const getGuestFieldByLang = (
  guest: Guest,
  field: string,
  language: string | undefined
): string => {
  if (!language) language = "it";
  switch (field) {
    case "jobTitle":
      return language === "it"
        ? guest.jobTitleIt || ""
        : guest.jobTitleEn
        ? guest.jobTitleEn
        : guest.jobTitleIt || "";
    case "description":
      return language === "it"
        ? guest.descrizioneIt || ""
        : guest.descrizioneEn
        ? guest.descrizioneEn
        : guest.descrizioneIt || "";

    default:
      return "";
  }
};
