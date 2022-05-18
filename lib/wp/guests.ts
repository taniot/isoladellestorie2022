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
      }
    }
  }
`;

/*
/ get ALL db pages
*/
export const getGuests = async () => {
  const query = qGetGuests;

  if (!client) return null;

  try {
    const data = await client.request(query);
    return data?.ospiti?.nodes;
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

    data.push({
      title,
      slug,
      image: faker.image.people(500, 500, true),
    });
  }

  return data;
};
