import React, { Component } from 'react';
import Link from 'next/link';
import WPAPI from 'wpapi';

import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu, { MenuItems } from '../components/Menu';
import Config from '../config';
import { PostItem } from './post';

const wp = new WPAPI({ endpoint: Config.apiUrl });

interface ComponentProps {
  posts: PostItem[];
  pages: PostItem[];
  headerMenu: MenuItems;
}
interface ComponentState {
  id: string;
}

class Index extends Component<ComponentProps, ComponentState> {
  static async getInitialProps() {
    const [page, posts, pages] = await Promise.all([
      wp
        .pages()
        .slug('welcome')
        .embed()
        .then((data) => {
          return data[0];
        }),
      wp.posts().embed(),
      wp.pages().embed(),
    ]);

    return { page, posts, pages };
  }

  render() {
    const { posts, pages, headerMenu } = this.props;

    const fPosts = posts.map((post) => {
      return (
        <ul key={post.slug}>
          <li>
            <Link
              as={`/post/${post.slug}`}
              href={`/post?slug=${post.slug}&apiRoute=post`}
            >
              <a>{post.title.rendered}</a>
            </Link>
          </li>
        </ul>
      );
    });
    const fPages = pages.map((pageItem) => {
      return (
        <ul key={pageItem.slug}>
          <li>
            <Link
              as={`/page/${pageItem.slug}`}
              href={`/post?slug=${pageItem.slug}&apiRoute=page`}
            >
              <a href="/">{pageItem.title.rendered}</a>
            </Link>
          </li>
        </ul>
      );
    });

    return (
      <Layout>
        <Menu menu={headerMenu} />
        Logo
        {/* <h1>{page.title.rendered}</h1> */}
        {/* <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: page.content.rendered,
          }}
        /> */}
        <h2>Posts</h2>
        {fPosts}
        <h2>Pages</h2>
        {fPages}
        <h2>Where We are?</h2>
        <p>You are looking at the REST API-powered React frontend.</p>
      </Layout>
    );
  }
}

export default PageWrapper(Index);
