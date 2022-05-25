import { gql } from "graphql-request";
import { client } from "../client";

//queries

const qGetSponsors = gql`
  query {
    sponsors(
      last: 100
      where: { orderby: { field: MENU_ORDER, order: DESC } }
    ) {
      nodes {
        id
        title
        menuOrder
        dettagliSponsor {
          sponsorLink
        }
        featuredImage {
          node {
            guid
          }
        }
        tipologieSponsor {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

/*
/ get ALL db pages
*/
export const getSponsors = async (tipologia?: string) => {
  const query = qGetSponsors;
  if (!client) return null;

  let result = null;

  try {
    const data = await client.request(query);

    result = data.sponsors.nodes.map((sponsor) => {
      return {
        title: sponsor?.title,
        order: sponsor?.menuOrder,
        type: sponsor?.tipologieSponsor.nodes[0]?.slug || null,
        link: sponsor?.dettagliSponsor?.sponsorLink || null,
        image: sponsor.featuredImage?.node?.guid || null,
      };
    });

    if (tipologia) {
      result = result.filter((sponsor) => sponsor.type === tipologia);
    }

    result.sort((a, b) => a.order - b.order);

    return result;
  } catch (error) {
    console.log({ error });
    return null;
  }
};