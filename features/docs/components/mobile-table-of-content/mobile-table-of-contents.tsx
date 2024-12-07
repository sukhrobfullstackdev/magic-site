import { Flex, Icon, Media, MonochromeIcons, Outset, Popover, Spacer, TextButton } from '@magiclabs/ui';
import React, { useCallback, useRef, useState } from 'react';
import { useClickOutside } from 'usable-react';
import { TableOfContents } from 'components/widgets/table-of-contents';
import type { DocsPageRenderData } from 'features/docs/docs-data';

interface MobileTableOfContentsProps {
  data: DocsPageRenderData;
  styles: Record<string, string | undefined>;
}

export const MobileTableOfContents: React.FC<MobileTableOfContentsProps> = props => {
  const { data, styles } = props;

  const [showTOC, setShowTOC] = useState(false);
  const tocContentRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(
    tocContentRef,
    () => {
      if (showTOC) {
        setShowTOC(false);
      }
    },
    [showTOC],
  );

  const toggleShowTOC = useCallback(() => {
    setShowTOC(!showTOC);
  }, [showTOC]);

  return (
    <Media lessThan="lg" className={styles.tableOfContentsNav}>
      <Flex.Column horizontal="center">
        <Outset left={15} right={15} top={10} bottom={10}>
          <Flex.Row className={styles.tableOfContentsNavActions} horizontal="flex-end" vertical="center">
            <Popover in={showTOC} placement="bottom-end" arrow={false}>
              <Popover.Anchor>
                <TextButton onPress={toggleShowTOC} size="sm" color="tertiary" aria-label="open table of contents">
                  Table of Contents <Spacer size={5} orientation="horizontal" />
                  <Icon size={20} type={MonochromeIcons.CaretDown} />
                </TextButton>
              </Popover.Anchor>

              <Popover.Content ref={tocContentRef}>
                <TableOfContents
                  title={data.title!}
                  structure={data.tableOfContents!}
                  hasBorderLeft={false}
                  onClick={toggleShowTOC}
                  maxHeight={320}
                  maxWidth={250}
                />
              </Popover.Content>
            </Popover>
          </Flex.Row>
        </Outset>
      </Flex.Column>
    </Media>
  );
};
