/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from 'react';
import Link from 'next/link';

export interface MenuItem {
  object: string;
  url: string;
  ID: string;
  title: string;
}

export interface MenuItems {
  items: MenuItem[];
}
interface ComponentProps {
  menu: MenuItems;
}
const linkStyle = {
  marginRight: 15,
};

const getSlug = (url: string) => {
  const parts = url.split('/');

  return parts.length > 2 ? parts[parts.length - 2] : '';
};

class Menu extends PureComponent<ComponentProps> {
  render() {
    const { menu } = this.props;
    const menuItems = menu.items.map((item) => {
      if (item.object === 'custom') {
        return (
          <Link href={item.url} key={item.ID}>
            <a style={linkStyle}>{item.title}</a>
          </Link>
        );
      }
      const slug = getSlug(item.url);
      const actualPage = item.object === 'category' ? 'category' : 'post';

      return (
        <Link
          as={`/${item.object}/${slug}`}
          href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
          key={item.ID}
        >
          <a style={linkStyle}>{item.title}</a>
        </Link>
      );
    });

    return (
      <div>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        {menuItems}
      </div>
    );
  }
}

export default Menu;
