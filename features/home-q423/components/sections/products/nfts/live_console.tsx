import React, { useState } from 'react';
import { clsx } from '@magiclabs/ui';
import Image from 'next/image';
import styles from './mint_demo.module.less';

import MagicCodeBlock from './images/MagicCodeBlock.png';
import MagicCodeBlockCopied from './images/MagicCodeBlockCopied.png';
import MagicCodeBlockNoCopy from './images/MagicCodeBlockNoCopy.png';
// import MagicCodeBlockCopy from './images/MagicCodeBlockCopy.png';
import MagicCodeBlockFlower from './images/MagicCodeBlockFlower.png';

export const LiveConsole = () => {
  const copyToClipboard = `
  import Web3 from 'web3'; 
  import { Magic } from 'magic-sdk'; 

  const magic = new Magic ('YOUR_API_KEY', { 
  network: "sepolia", 
  }); 
  const web3 = new Web3(magic.rpcProvider); 

  web3.eth.getAccounts();
  `;

  const handleCopyToClipboard = () => {
    const textArea = document.createElement('textarea');
    textArea.value = copyToClipboard;
    (textArea as HTMLTextAreaElement).style.height = '0px';
    (textArea as HTMLTextAreaElement).style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCodeCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const [codeCopied, setCodeCopied] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <div className="d-block d-lg-none" style={{ position: 'relative', zIndex: 2 }}>
        <Image
          src={MagicCodeBlockNoCopy}
          alt="Magic"
          width={515}
          height={350}
          className="max-w-100 h-auto"
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className="d-none d-lg-block" style={{ position: 'relative', zIndex: 2 }}>
        <Image
          src={!codeCopied ? MagicCodeBlock : MagicCodeBlockCopied}
          alt="Magic"
          width={515}
          height={350}
          className="max-w-100 h-auto"
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div
        className={clsx(styles.copy, 'd-none d-lg-block')}
        style={{
          position: 'absolute',
          top: '17%',
          right: '14%',
          zIndex: 11,
          width: '12%',
          height: '7%',
        }}
      >
        {/* <Image src={MagicCodeBlockCopy} width={70} height={29} layout="intrinsic" onClick={handleCopyToClipboard} /> */}
        <div
          className=""
          onClick={handleCopyToClipboard}
          style={{
            cursor: 'pointer',
            width: '100%',
            height: '100%',
            opacity: 0,
          }}
        />
      </div>
      <div className={clsx(styles.flower, '')}>
        <Image src={MagicCodeBlockFlower} width={600} height={600} alt="" />
      </div>
    </div>
  );
};
