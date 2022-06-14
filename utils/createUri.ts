import { PreviewData } from "next";

export const createURI = (
  uri: string[] | string | undefined,
  locale: string = "it",
  defaultLocale: string = "it"
) => {
  let uriParts = [];
  if (locale !== defaultLocale) uriParts.push(locale);
  if (uri && Array.isArray(uri)) uriParts = [...uriParts, ...uri];

  let pageURI = `/${uriParts.join("/")}/`;

  return pageURI;
};
