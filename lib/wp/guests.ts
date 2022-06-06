import { gql } from "graphql-request";
import { client } from "../client";
import { faker } from "@faker-js/faker";
import slugify from "slugify";

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

  if (!client) return null;

  try {
    const { ospite } = await client.request(query, variables);

    return {
      title: ospite?.title,
      nome: ospite.dettagliOspite.nome,
      cognome: ospite.dettagliOspite.cognome,
      slug: ospite?.slug,
      ordinamento: ospite.dettagliOspite.ordinamento,
      image: ospite?.featuredImage?.node?.guid || null,
      tagLine: ospite?.dettagliOspite?.jobTitleIt || null,
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

  if (!client) return null;

  try {
    const data = await client.request(query);

    let result = data?.ospiti?.nodes.map(
      (item: {
        title: string;
        slug: string;
        dettagliOspite: {
          ordinamento: string;
          jobTitleIt: string;
          jobTitleEn: string;
          nome: string;
          cognome: string;
        };
        featuredImage: { node: { guid: string } };
      }) => {
        return {
          title: item?.title,
          slug: item?.slug,
          ordinamento: item.dettagliOspite.ordinamento,
          image: item?.featuredImage?.node?.guid || null,
          tagLine: item?.dettagliOspite?.jobTitleIt || null,
          jobTitleIt: item?.dettagliOspite?.jobTitleIt || null,
          jobTitleEn: item?.dettagliOspite?.jobTitleEn || null,
          nome: item?.dettagliOspite?.nome || null,
          cognome: item?.dettagliOspite?.cognome || null,
        };
      }
    );

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
    return null;
  }
};

export const getGuestsFake = async (count: number) => {
  const data = [];

  for (let index = 0; index < count; index++) {
    const title = faker.name.firstName() + " " + faker.name.lastName();
    const slug = slugify(title, { lower: true, strict: true });
    const tagLine = faker.name.jobTitle();

    data.push({
      title,
      slug,
      image: faker.image.people(500, 500, true),
      tagLine,
    });
  }

  return data;
};

export const getGuestFieldByLang = (
  guest: any,
  field: string,
  language: string | undefined
) => {
  if (!language) return null;
  switch (field) {
    case "jobTitle":
      return language === "it"
        ? guest.jobTitleIt
        : guest.jobTitleEn
        ? guest.jobTitleEn
        : guest.jobTitleIt;
    case "description":
      return language === "it"
        ? guest.descrizioneIt
        : guest.descrizioneEn
        ? guest.descrizioneEn
        : guest.descrizioneIt || null;

    default:
      return;
  }
};
