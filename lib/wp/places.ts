import { gql } from "graphql-request";
import { client } from "../client";
import { faker } from "@faker-js/faker";
import slugify from "slugify";

faker.locale = "it";

export const getPlacesFake = async (count: number) => {
  const data = [];

  for (let index = 0; index < count; index++) {
    data.push({
      title: faker.company.companyName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      email: faker.internet.email(),
      web: faker.internet.domainName(),
      phone1: faker.phone.phoneNumber(),
      phone2: faker.phone.phoneNumber(),
    });
  }

  return data;
};
