import { GraphQLClient } from "graphql-request";

let endpoint;
if (process.env.NEXT_PUBLIC_DB_HOSTNAME) {
  endpoint = process.env.NEXT_PUBLIC_DB_HOSTNAME;
} else {
  throw new Error("DB_HOSTNAME environment variable is not set");
}

export const client = new GraphQLClient(endpoint, { headers: {} }) || null;
