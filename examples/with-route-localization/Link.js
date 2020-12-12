require('babel-polyfill');

import React from 'react';
import NextLink from 'next/link';
import { createRouteLinks } from 'routex.js';
import isEqual from 'react-fast-compare';

const RoutesContext = React.createContext([]);

export function RoutesProvider({ children, routes }) {
  return (
    <RoutesContext.Provider value={routes}>{children}</RoutesContext.Provider>
  );
}

const CustomLink = ({ children, title, route, params }) => {
  return (
    <RoutesContext.Consumer>
      {routes => {
        const { link } = createRouteLinks(routes);
        const { as, href } = link({ route, params: { ...params } });

        return (
          <NextLink as={as} href={href}>
            <a title={title}>{children}</a>
          </NextLink>
        );
      }}
    </RoutesContext.Consumer>
  );
};

export default React.memo(CustomLink, isEqual);
