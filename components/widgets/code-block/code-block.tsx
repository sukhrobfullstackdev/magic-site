import React, { useCallback, useEffect, useState } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import Prism from 'prism-react-renderer/prism';
import prismTheme from 'prism-react-renderer/themes/shadesOfPurple';
import { Icon, MonochromeIcons, TextButton, useToast } from '@magiclabs/ui';
import { useClipboard } from 'usable-react';

import { isEmpty } from 'lodash';
import styles from './code-block.module.less';
import { storage } from '../../../lib/web-storage';
import { displayCodeLanguage } from '../../../lib/code-language';

(typeof global !== 'undefined' ? (global as any) : (window as any)).Prism = Prism;

// Register languages for Prism here.
// Defaults: https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
require('prismjs/components/prism-dart');
require('prismjs/components/prism-swift');
require('prismjs/components/prism-kotlin');
require('prismjs/components/prism-csharp');
require('prismjs/components/prism-ruby');
require('prismjs/components/prism-php');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-solidity');

interface CodeBlockProps {
  codes: string;
  languages: Language[];
  titles: string[];
}

export const CodeBlock: React.FC<CodeBlockProps> = props => {
  const { codes, languages, titles } = props;

  const languagesList = languages || [];

  const { createToast } = useToast();
  const { copy } = useClipboard();

  const [selectedIndex, setSelectedIndex] = useState(0);

  /* Preselect preferred language */
  useEffect(() => {
    const storedPreferredLanguageIndex = languagesList.findIndex(el => el === storage.getItem('preferredLanguage'));
    setSelectedIndex(storedPreferredLanguageIndex < 0 ? 0 : storedPreferredLanguageIndex);
  }, []);

  // we use triple dash as dividers
  const splitCodeList = codes.split('---\n');
  const selectedCode = splitCodeList[selectedIndex] || '';

  const onCopyRequest = useCallback(async () => {
    try {
      await copy(selectedCode);
      createToast({ type: 'success', message: 'Copied to clipboard!' });
    } catch {
      createToast({ type: 'error', message: 'Failed to copy to clipboard.' });
    }
  }, [splitCodeList, copy, createToast]);

  const selectCodeTab = useCallback(
    index => {
      storage.setItem('preferredLanguage', languagesList[index]);
      setSelectedIndex(index);
    },
    [selectedIndex],
  );

  return (
    <div className={styles.CodeBlock}>
      <Highlight
        {...defaultProps}
        code={selectedCode.trim()}
        theme={prismTheme}
        language={languagesList[selectedIndex]}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div className={className} style={style}>
            <div className={styles.CodeBlockHeader}>
              {!isEmpty(languagesList) ? (
                <div className={styles.tabs}>
                  {languagesList.map((language, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        className={`${styles.tabHeader} ${isSelected ? styles.selected : ''}`}
                        onClick={() => selectCodeTab(index)}
                        // eslint-disable-next-line react/no-array-index-key
                        key={`${language}-${index}`}
                      >
                        {displayCodeLanguage(titles[index])}
                        {isSelected ? <div className={styles.highlightBar} /> : null}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div />
              )}
              <div className={styles.copyButtonWrapper}>
                <TextButton onPress={onCopyRequest} color="secondary">
                  <Icon type={MonochromeIcons.Copy} /> Copy
                </TextButton>
              </div>
            </div>
            {tokens.map((line, i) => (
              <pre {...getLineProps({ line, key: i })}>
                <span className={styles.lineNumber}>
                  {(i + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 })}
                </span>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </pre>
            ))}
          </div>
        )}
      </Highlight>
    </div>
  );
};
