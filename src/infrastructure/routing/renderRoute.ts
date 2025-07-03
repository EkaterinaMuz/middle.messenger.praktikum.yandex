import { routes } from './routes';
import type Block from '../../framework/Block';

import type { RouteConfigPaths } from './types';

export async function renderRoute(route: RouteConfigPaths): Promise<Block> {
  const pageLoader = routes[route];

  return await pageLoader();
}
