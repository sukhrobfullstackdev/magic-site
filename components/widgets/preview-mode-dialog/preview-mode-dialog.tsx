/* eslint-disable react/jsx-pascal-case */

import React from 'react';
import { CallToAction, Spacer } from '@magiclabs/ui';
import Link from 'next/link';
import { Card } from 'components/partials/cards/card';

import styles from './preview-mode-dialog.module.less';

export const PreviewModeDialog: React.FC = () => {
  return (
    <Card className={styles.PreviewModeDialog}>
      <div className={styles.message}>
        You are currently in <b>preview mode</b>.
      </div>
      <Spacer size={30} orientation="vertical" />
      <Link href="/api/exit-preview" passHref legacyBehavior>
        <CallToAction.a className={styles.button} size="sm" data-mode="popup">
          Exit Preview
        </CallToAction.a>
      </Link>
    </Card>
  );
};
