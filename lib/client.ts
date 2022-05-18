import { GraphQLClient } from "graphql-request";

let endpoint;
if (process.env.WP_HOSTNAME) {
  endpoint = process.env.WP_HOSTNAME;
} else {
  throw new Error("WP_HOSTNAME environment variable is not set");
}

export const client = new GraphQLClient(endpoint, { headers: {} }) || null;
