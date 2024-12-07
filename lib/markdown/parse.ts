/* eslint-disable global-require */

import unified from 'unified';

const remarkPlugins = [
  [require('remark-parse')],
  [require('remark-slug')],
  [require('remark-admonitions'), { icons: 'svg', infirma: false }],
  [require('remark-rehype'), { allowDangerousHtml: true }],
];

const rehypePlugins = [[require('rehype-raw')], [require('rehype-highlight')]];

function createParser() {
  const parser = unified();

  // Apply Remark plugins
  for (const [plugin, options] of remarkPlugins) {
    parser.use(plugin, options);
  }

  // Apply Rehype plugins
  for (const [plugin, options] of rehypePlugins) {
    parser.use(plugin, options);
  }

  return parser;
}

export function parseMarkdown(source: string) {
  if (!source) return null;
  return createParser().parse(source);
}

export function compileMarkdown(source: string, { createElement, components }) {
  if (!source) return null;
  const parser = createParser();

  // Add a compiler from HTML -> React
  parser.use(require('rehype-react'), { createElement, components });

  // Compile synchronously because we're using this in a React render function.
  return parser.processSync(source).result;
}
