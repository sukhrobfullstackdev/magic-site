/* eslint-disable import/no-extraneous-dependencies */

import { Node, isText, isElement } from '@graphcms/rich-text-types';
import { TableOfContentsNode } from 'components/widgets/table-of-contents';
import { flattenDeep, kebabCase, toLower } from 'lodash';

export enum RecordType {
  Text = 'text',
  Heading_1 = 'heading.1',
  Heading_2 = 'heading.2',
  Heading_3 = 'heading.3',
  Heading_4 = 'heading.4',
  Heading_5 = 'heading.5',
  Heading_6 = 'heading.6',
}

export interface RichTextRecord {
  recordType: RecordType;
  content: string;
}

export type RichTextAST = Node[] | { children: Node[] };

//
// Here's a list of node types from the GraphCMS rich text AST schema:
//
//   - 'bulleted-list'
//   - 'numbered-list'
//   - 'list-item'
//   - 'list-item-child'
//   - 'table'
//   - 'table_head'
//   - 'table_body'
//   - 'table_row'
//   - 'table_cell'
//   - 'block-quote'
//   - 'paragraph'
//   - 'heading-one'
//   - 'heading-two'
//   - 'heading-three'
//   - 'heading-four'
//   - 'heading-five'
//   - 'heading-six'
//   - 'class'
//   - 'link'
//   - 'image'
//   - 'video'
//   - 'iframe'
//   - 'embed'
//   - 'code-block'
//

/**
 * Indexes a GraphCMS rich text AST into a flat array of records.
 */
export function indexRichText(input: RichTextAST): RichTextRecord[] {
  const ast = Array.isArray(input) ? input : input.children;
  return flattenDeep(ast.map(handleNode)).filter(Boolean);
}

/**
 * Indexes a GraphCMS rich text AST into flat array of ToC-compatible nodes.
 */
export function generateRichTextTableOfContents(input?: RichTextAST): TableOfContentsNode[] {
  if (!input) return [];

  const seenSlugs: Record<string, number> = {};

  const richTextRecords = indexRichText(input);

  return richTextRecords
    .filter(({ recordType }) => [RecordType.Heading_1, RecordType.Heading_2].includes(recordType))
    .map(({ content, recordType }) => {
      const id = /\s/.test(content) ? kebabCase(content) : toLower(content); // backwards compat

      const slug = seenSlugs[id] != null ? `${id}-${seenSlugs[id]++}` : id;
      if (seenSlugs[id] == null) seenSlugs[id] = 0;

      return {
        content,
        slug,
        lvl: Number(recordType.split('.')[1]),
      };
    });
}

function handleNode(node: Node) {
  const createRecord = (recordType: RecordType, content: string) => {
    // Remove whitespace-only text records.
    if (!content || /^\s+$/.test(content)) return undefined;
    return { recordType, content };
  };

  if (isText(node)) {
    return createRecord(RecordType.Text, node.text);
  }

  switch (node.type) {
    // Text nodes
    case 'list-item':
    case 'paragraph':
    case 'block-quote':
      return createRecord(RecordType.Text, reduceInnerText(node));

    // Heading nodes
    case 'heading-one':
      return createRecord(RecordType.Heading_1, reduceInnerText(node));
    case 'heading-two':
      return createRecord(RecordType.Heading_2, reduceInnerText(node));
    case 'heading-three':
      return createRecord(RecordType.Heading_3, reduceInnerText(node));
    case 'heading-four':
      return createRecord(RecordType.Heading_4, reduceInnerText(node));
    case 'heading-five':
      return createRecord(RecordType.Heading_5, reduceInnerText(node));
    case 'heading-six':
      return createRecord(RecordType.Heading_6, reduceInnerText(node));

    // Ignore nodes
    case 'code-block':
    case 'table':
    case 'image':
    case 'video':
    case 'iframe':
    case 'embed':
      return undefined;

    // The rest are passed through, ultimately resulting in a text node, heading
    // node, or ignored node.
    default:
      return node.children.map(handleNode);
  }
}

export function reduceInnerText(node: Node | Node[]): string {
  if (Array.isArray(node)) {
    return node.map(reduceInnerText).filter(Boolean).join('');
  }

  if (isText(node)) return node.text;

  return node.children.reduce((acc, curr) => {
    if (isElement(curr) && curr.children) {
      return acc + reduceInnerText(curr);
    }

    return acc + (curr.text ?? '');
  }, '');
}
