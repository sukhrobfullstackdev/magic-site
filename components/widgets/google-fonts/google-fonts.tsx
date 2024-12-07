import React from 'react';

interface GoogleFontsProps {
  href?: string;
}

/**
 * Connect Google Fonts asynchronously.
 * Based on the `next-google-fonts` library by Joe Bell.
 *
 * @see https://github.com/joe-bell/next-google-fonts
 */
export const GoogleFonts: React.FC<GoogleFontsProps> = props => {
  const { href } = props;

  return (
    <>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
        data-google-fonts="preconnect"
        key="google-fonts__preconnect"
      />
      <link rel="preload" as="style" href={href} data-google-fonts="preload" key="google-fonts__preload" />
      <link href={href} rel="stylesheet" media="all" data-google-fonts="style" key="google-fonts__style" />
      <noscript>
        <link href={href} rel="stylesheet" data-google-fonts="style-no-js" key="google-fonts__style-no-js" />
      </noscript>
    </>
  );
};
