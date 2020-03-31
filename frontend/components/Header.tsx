import React from 'react';
import Head from 'next/head';

import * as stylesheet from '../src/styles/style.scss';

const Header = () => (
  <div>
    <Head>
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: stylesheet }}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>WordPress + React Starter Kit Frontend</title>
    </Head>
  </div>
);

export default Header;
