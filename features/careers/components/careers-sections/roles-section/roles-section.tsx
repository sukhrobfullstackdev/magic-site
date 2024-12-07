import React, { useState, useEffect } from 'react';
import { clsx, Flex, Icon, MonochromeIcons, Spacer, useTheme } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';
import imgMembers from 'public/images/careers/roles-section/hiro-members.png';

import styles from './roles-section.module.less';

export interface WorkableRole {
  id: number;
  title: string;
  location: {
    name: string;
  };
  absolute_url: string;
}

export const RolesSection: React.FC = () => {
  const [openRoles, setOpenRoles] = useState<any[]>([]);

  const getWorkableRoles = async () => {
    const rolesResponse = await fetch('https://boards-api.greenhouse.io/v1/boards/magic/jobs')
      .then(res => res.json())
      .then(data => {
        console.log(data.jobs);
        setOpenRoles(data.jobs);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getWorkableRoles();
  }, []);

  return (
    <SectionWrapper>
      <div id="roles" className={styles.RolesSection}>
        <div className={styles.content}>
          <h3 className={clsx('mb-3')}>
            Ready to be the
            <br />
            next Magician?
          </h3>
          <Image
            src={imgMembers}
            alt="Magicians"
            className={styles.illustration}
            width={752}
            height={224}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />
        </div>

        <div className={styles.cards}>
          {Object.keys(openRoles).length > 0 && openRoles.map(props => <RoleCard key={props.id} {...props} />)}
        </div>
      </div>
    </SectionWrapper>
  );
};

const RoleCard: React.FC<WorkableRole> = props => {
  const { title, location, absolute_url } = props;

  const theme = useTheme();

  return (
    <a href={absolute_url} target="_blank" rel="noopener noreferrer" className={styles.RoleCard}>
      <Flex.Row vertical="center" horizontal="space-between">
        <p className={clsx(styles.title, 'textLG')}>
          <b>{title}</b>
        </p>

        <Flex.Row vertical="center">
          <p className={clsx(styles.location, 'textLG')}>{location.name}</p>
          <Spacer size={16} orientation="horizontal" />
          <Icon type={MonochromeIcons.CaretRight} color={theme.hex.primary.base} />
        </Flex.Row>
      </Flex.Row>
    </a>
  );
};
