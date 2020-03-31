import React, { Component } from 'react';
import Error from 'next/error';
import WPAPI from 'wpapi';
import { NextPageContext } from 'next';

import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu, { MenuItems } from '../components/Menu';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });

export interface PostItem {
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  code: string;
}
interface ComponentProps {
  post: PostItem;
  headerMenu: MenuItems;
}

class Post extends Component<ComponentProps, {}> {
  static async getInitialProps(context: NextPageContext) {
    const { slug, apiRoute } = context.query;
    let apiMethod = wp.posts();

    switch (apiRoute) {
      case 'category':
        apiMethod = wp.categories();
        break;
      case 'page':
        apiMethod = wp.pages();
        break;
      default:
        break;
    }
    const post = await apiMethod
      .slug(slug.toString())
      .embed()
      .then((data) => {
        return data[0];
      });

    return { post };
  }

  render() {
    const { post, headerMenu } = this.props;

    if (!post.title) return <Error statusCode={404} />;

    return (
      <Layout>
        <Menu menu={headerMenu} />
        <h1>{post.title.rendered}</h1>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}
        />
      </Layout>
    );
  }
}

export default PageWrapper(Post);
