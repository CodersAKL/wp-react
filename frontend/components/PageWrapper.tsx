import React from 'react';
import WPAPI from 'wpapi';
import { NextPage, NextPageContext } from 'next';

import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });

// This route is copied from the plugin: wordpress/wp-content/plugins/wp-rest-api-v2-menus/wp-rest-api-v2-menus.php
wp.menus = wp.registerRoute('menus/v1', '/menus/(?P<id>[a-zA-Z(-]+)');

function PageWrapper<T, S>(Comp: NextPage<T, S>) {
  return class extends React.Component {
    static async getInitialProps(args: NextPageContext) {
      const [headerMenu, childProps] = await Promise.all([
        wp.menus().id('header-menu'),
        Comp.getInitialProps ? Comp.getInitialProps(args) : null,
      ]);

      return {
        headerMenu,
        ...(Comp.getInitialProps ? childProps : null),
      };
    }

    render() {
      return <Comp {...(this.props as T)} />;
    }
  };
}

export default PageWrapper;
