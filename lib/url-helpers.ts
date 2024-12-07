/**
 * Remove the query/hash fragment from a URL string.
 * e.g. cleanURL(path/to/myfile.png?foo=bar#hash) -> path/to/myfile.png
 */
export function cleanURL(url: string) {
  return url.replace(/(\?.*)|(#.*)/g, '');
}

/**
 * From the string `url`, get just the path part (without query or hash).
 */
export function getPathFromURL(url: string) {
  return url.split(/[?#]/)[0];
}
