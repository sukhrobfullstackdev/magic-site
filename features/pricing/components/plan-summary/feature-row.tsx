import React, { ComponentProps, SVGProps } from 'react';
import { Flex, clsx } from '@magiclabs/ui';
import { SwitchCase } from 'components/widgets/switch-case';

export const IconTooltip = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM9.50664 11.3216H7.8038V11.1886C7.81402 9.34771 8.33561 8.7801 9.24073 8.2176C9.85948 7.82896 10.335 7.33805 10.335 6.62214C10.335 5.8193 9.70607 5.29771 8.92368 5.29771C8.20266 5.29771 7.50721 5.75794 7.46118 6.7193H5.64073C5.69186 4.77612 7.14414 3.78408 8.93391 3.78408C10.8873 3.78408 12.2322 4.86817 12.2322 6.59658C12.2322 7.7676 11.6441 8.53464 10.7032 9.09714C9.86971 9.60851 9.51686 10.1045 9.50664 11.1886V11.3216ZM9.82368 13.3875C9.81857 14.0113 9.30209 14.5125 8.69868 14.5125C8.07482 14.5125 7.56857 14.0113 7.57368 13.3875C7.56857 12.7738 8.07482 12.2727 8.69868 12.2727C9.30209 12.2727 9.81857 12.7738 9.82368 13.3875Z"
        fill="#B6B4BA"
      />
    </svg>
  );
};

const IconPlus = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="Icon">
        <path
          id="Plus"
          d="M13.1109 7.33268H8.6665V2.88824C8.6665 2.77713 8.55539 2.66602 8.44428 2.66602H7.55539C7.4165 2.66602 7.33317 2.77713 7.33317 2.88824V7.33268H2.88873C2.74984 7.33268 2.6665 7.44379 2.6665 7.5549V8.44379C2.6665 8.58268 2.74984 8.66602 2.88873 8.66602H7.33317V13.1105C7.33317 13.2493 7.4165 13.3327 7.55539 13.3327H8.44428C8.55539 13.3327 8.6665 13.2493 8.6665 13.1105V8.66602H13.1109C13.2221 8.66602 13.3332 8.58268 13.3332 8.44379V7.5549C13.3332 7.44379 13.2221 7.33268 13.1109 7.33268Z"
          fill="#A799FF"
          stroke="#A799FF"
        />
      </g>
    </svg>
  );
};

const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="Icon">
        <path
          id="Vector 30 (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.6549 3.84759C13.8475 4.03512 13.8574 4.34142 13.6772 4.54096L6.41035 12.589C6.21181 12.8089 5.86669 12.8089 5.66815 12.589L2.32276 8.884C2.14258 8.68446 2.15245 8.37816 2.34511 8.19063L2.8439 7.70511C3.04704 7.50738 3.37377 7.51791 3.56376 7.72832L6.03925 10.4699L12.4362 3.38528C12.6262 3.17487 12.953 3.16434 13.1561 3.36207L13.6549 3.84759Z"
          fill="#A799FF"
          stroke="#A799FF"
        />
      </g>
    </svg>
  );
};

type Props = ComponentProps<'p'> & {
  icon?: 'check' | 'plus' | 'none';
  description: string;
};

export const FeatureRow = ({ icon = 'check', description, ...rest }: Props) => {
  return (
    <Flex.Row style={{ gap: '10px' }} alignItems="center">
      {icon !== 'none' && (
        <div style={{ padding: '4px' }}>
          <SwitchCase
            value={icon}
            caseBy={{
              check: <CheckIcon />,
              plus: <IconPlus />,
            }}
            defaultComponent={<CheckIcon />}
          />
        </div>
      )}

      <p className={clsx('typography-m')} {...rest}>
        {description}
      </p>
    </Flex.Row>
  );
};
