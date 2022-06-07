import { gql } from "graphql-request";
import { client } from "../client";
import { replaceText } from "../../utils/replaceText";

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
`;

export const getTranslations = async () => {
  const query = qGetTranslations;
  if (!client) return null;

  let result = null;

  try {
    const data = await client.request(query);

    result = data.traduzioni.nodes.map((traduzione: any) => {
      return {
        id: traduzione?.id,
        title: traduzione?.title,
        slug: traduzione?.dettagliTraduzioni?.slugTraduzione || null,
        link: traduzione?.dettagliTraduzioni?.linkTraduzione || null,
        language: traduzione?.language.slug || null,
      };
    });

    console.log({ result });

    return result;
  } catch (error) {
    return [];
  }
};

export const getTranslation = (
  translations: any[] | undefined,
  slug: string,
  language: string = "it",
  what: string = "title"
) => {
  if (!translations) return null;
  const result =
    translations
      .filter((tr: any) => tr.language === language)
      .find((tr: any) => tr.slug === slug) ||
    translations
      .filter((tr: any) => tr.language === "it")
      .find((tr: any) => tr.slug === slug) ||
    null;

  if (what === "title") return result?.title;
  if (what === "link") {
    return result?.link?.url
      ? replaceText(
          result?.link?.url,
          "https://cms2022.isoladellestorie.it/",
          "/"
        )
      : "#";
  }
};
