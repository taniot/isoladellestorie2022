export const createURI = (
  uri: string[] | string | undefined,
  locale = 'it',
  defaultLocale = 'it'
) => {
  let uriParts = []
  if (locale !== defaultLocale) uriParts.push(locale)
  if (uri && Array.isArray(uri)) uriParts = [...uriParts, ...uri]

  const pageURI = `/${uriParts.join('/')}/`

  return pageURI
}
