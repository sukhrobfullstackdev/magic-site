import React from 'react';
import { CallToAction, TextButton, Linkable } from '@magiclabs/ui';

const typeformLinks = {
  internal: 'https://form.typeform.com/to/EgSVZKEI',
  prod: 'https://magic-fortmatic.typeform.com/to/epD4LNCX',
};

const formLink = typeformLinks.prod;

const typeformButtonComponents = {
  CallToAction: (props: any) => {
    const { children, wrapperProps } = props;

    // Class "typeform-share" is required to enable the embedded form functionality
    return (
      <CallToAction.a className="typeform-share" {...wrapperProps} href={formLink} data-mode="popup">
        {children}
      </CallToAction.a>
    );
  },

  TextButton: (props: any) => {
    const { children, wrapperProps } = props;

    // Class "typeform-share" is required to enable the embedded form functionality
    return (
      <TextButton.a className="typeform-share" {...wrapperProps} href={formLink} data-mode="popup">
        {children}
      </TextButton.a>
    );
  },

  a: (props: any) => {
    const { children, wrapperProps } = props;
    return (
      <Linkable>
        <a className="typeform-share" {...wrapperProps} href={formLink} data-mode="popup">
          {children}
        </a>
      </Linkable>
    );
  },
};

interface TypeformEmbeddedFormProps {
  wrapperType?: 'CallToAction' | 'TextButton' | 'a';
  [key: string]: any;
}

export const TypeformEmbeddedForm: React.FC<TypeformEmbeddedFormProps> = props => {
  const { children, wrapperType = 'a', ...wrapperProps } = props;
  const WrapperComponent = typeformButtonComponents[wrapperType];
  return <WrapperComponent wrapperProps={wrapperProps ?? {}}>{children}</WrapperComponent>;
};
