import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import WPAPI from 'wpapi';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });

class Index extends Component<{ posts: any, pages: any, headerMenu: any, page: any }> {
  state = {
    id: '',
  };

  static async getInitialProps() {
      const [page, posts, pages] = await Promise.all([
        wp
          .pages()
          .slug('welcome')
          .embed()
          .then(data => {
            return data[0];
          }),
        wp.posts().embed(),
        wp.pages().embed(),
      ]);

      return { page, posts, pages };
    }


  render() {
    const { posts, pages, headerMenu, page } = this.props;
    console.log(page);
    const fposts = posts.map(post => {
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
    const fpages = pages.map(ipage => {
      return (
        <ul key={ipage.slug}>
          <li>
            <Link
              as={`/page/${ipage.slug}`}
              href={`/post?slug=${ipage.slug}&apiRoute=page`}
            >
              <a href="/">{ipage.title.rendered}</a>
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
        {fposts}
        <h2>Pages</h2>
        {fpages}
        <h2>Where You're At</h2>
        <p>
          You are looking at the REST API-powered React frontend.
        </p>
      </Layout>
    );
  }
}

export default PageWrapper(Index);
