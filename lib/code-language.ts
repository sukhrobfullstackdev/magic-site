import { capitalize, isEmpty } from 'lodash';
import { Language } from 'prism-react-renderer';

export const displayCodeLanguage = (lang: string) => {
  switch (lang.toLowerCase()) {
    case 'php':
    case 'jsx':
    case 'npm':
    case 'cdn':
    case 'html':
      return lang.toUpperCase();
    case 'yarn':
      return capitalize(lang);
    default:
      return lang;
  }
};

/**
 * This function will take the languages list from the codeblock and map into proper format in coding conventions
 *
 * @param list
 */
export const codeLanguagesMapper = (list: Language[]): Language[] => {
  const newList: Language[] = [];

  if (isEmpty(list)) return newList;

  list.forEach(el => {
    switch (el.toLowerCase()) {
      // map js to Javascript
      case 'js':
        newList.push('javascript');
        break;

      // Omit bash and text, as we don't want to display them
      // case 'bash':
      case 'text':
        break;

      default:
        newList.push(el.toLowerCase() as Language);
    }
  });
  return newList;
};
