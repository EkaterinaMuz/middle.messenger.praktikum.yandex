import  { RouteConfigPaths } from '../routing/types';

export function isRouteConfigPath(value?: string): value is RouteConfigPaths {
  return Object.values(RouteConfigPaths).includes(value as RouteConfigPaths);
}

