'use client';

import React from 'react';
import Image from 'next/image';
// import Rive from '@rive-app/react-canvas';

import heroPlaceholder from '../images/heroPlaceholder.png';
import heroPlaceholderMobile from '../images/heroPlaceholderMobile.png';

export const RiveEmbed = ({ isMobileWidth }) => {
  // const { RiveComponent } = useRive({
  //   // src: '/riv/magic_link_passport.riv',
  //   // src: 'https://cdn.rive.app/animations/vehicles.riv',
  //   src: 'https://passport-identity-prod-assets.s3.us-west-2.amazonaws.com/assets/magic_link_passport_panel_v3.riv',
  //   stateMachines: 'bumpy',
  //   autoplay: true,
  //   onLoadError: () => console.log('ERROR LOADING RIVE'),
  //   onLoad: () => console.log('LOADED RIVE'),
  // });

  return (
    <div className="w-100" style={{ height: 'auto', position: 'relative' }}>
      {/* <Rive */}
      {/*  src="https://passport-identity-stagef-assets.s3.us-west-2.amazonaws.com/assets/magic_link_passport_panel_v3.riv" */}
      {/*  stateMachines="bumpy" */}
      {/* /> */}
      {/* <RiveComponent /> */}
      {isMobileWidth ? (
        <iframe
          title="Magic"
          width="530"
          height="700"
          src="https://rive.app/s/mXhU8RTRZku12n361bce5Q/embed"
          allowFullScreen
          allow="autoplay"
          className="d-block d-md-none"
          style={{
            maxWidth: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      ) : (
        <iframe
          title="Magic"
          width="1705"
          height="910"
          src="https://rive.app/s/Kkt7hL08hkeZmhTU0FGiPQ/embed"
          allowFullScreen
          allow="autoplay"
          className="d-none d-md-block"
          style={{
            maxWidth: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      )}
      <div className="d-block d-md-none">
        <Image
          src={heroPlaceholderMobile}
          width="530"
          height="700"
          alt="Passport"
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className="d-none d-md-block">
        <Image
          src={heroPlaceholder}
          width="1705"
          height="910"
          alt="Passport"
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
    </div>
  );
};
