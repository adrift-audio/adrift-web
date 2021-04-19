import React from 'react';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

function AdriftWeb({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <div className="container">
      <Component {...pageProps} />
    </div>
  );
}

export default AdriftWeb;
