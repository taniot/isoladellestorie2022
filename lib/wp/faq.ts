import { gql } from "graphql-request";
import { FaqType, PartnerType, wpFaq, wpPartner } from "../../store/types";
import { client } from "../client";

//queries

const qGetFaq = gql`
  query ($locale: LanguageCodeFilterEnum) {
    informazioni(
      where: { language: $locale, orderby: { field: MENU_ORDER, order: DESC } }
    ) {
      nodes {
        id
        title
        content
        menuOrder
      }
    }
  }
`;

/*
/ get ALL db pages
*/
export const getFaq = async (locale: string = "IT"): Promise<FaqType[]> => {
  const query = qGetFaq;
  if (!client) return [];

  let result = [];

  const variables = {
    locale,
  };

  try {
    const data = await client.request(query, variables);

    result = data?.informazioni?.nodes?.map((info: wpFaq) => {
      return {
        id: info?.id,
        title: info?.title,
        content: info?.content,
        order: info?.menuOrder,
      };
    });

    // result.sort(
    //   (a: FaqType, b: FaqType) => parseInt(a.order) - parseInt(b.order)
    // );

    return result;
  } catch (error) {
    console.log({ error });
    return [];
  }
};
