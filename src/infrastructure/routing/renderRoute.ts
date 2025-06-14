import { routes } from './routes';
import type { RouteConfigPaths } from './types';

export async function renderRoute(route: RouteConfigPaths) {
  const pageLoader = routes[route];

  return await pageLoader();
}
