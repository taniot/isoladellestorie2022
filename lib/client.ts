import { GraphQLClient } from "graphql-request";

const endpoint = "http://cms-isoladellestorie.local/graphql";
export const client = new GraphQLClient(endpoint, { headers: {} }) || null;
