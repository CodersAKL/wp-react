/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Error from 'next/error';
import WPAPI from 'wpapi';
import { NextPageContext } from 'next';

import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu, { MenuItems } from '../components/Menu';
import Config from '../config';
import { PostItem } from './post';

const wp = new WPAPI({ endpoint: Config.apiUrl });

export interface CategoryItem {
  id: string;
  name: string;
}
interface ComponentProps {
  categories: CategoryItem[];
  posts: PostItem[];
  headerMenu: MenuItems;
}

class Category extends Component<ComponentProps> {
  static async getInitialProps(context: NextPageContext) {
    const { slug } = context.query;
    const categories = await wp.categories().slug(slug.toString()).embed();

    if (categories.length > 0) {
      const posts = await wp.posts().category(categories[0].id).embed();

      return { categories, posts };
    }

    return { categories };
  }

  render() {
    const { categories, posts, headerMenu } = this.props;

    if (categories.length === 0) return <Error statusCode={404} />;
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

    return (
      <Layout>
        <Menu menu={headerMenu} />
        <h1>{categories[0].name} Posts</h1>
        {fPosts}
      </Layout>
    );
  }
}

export default PageWrapper(Category);
