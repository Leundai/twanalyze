import { atom } from 'jotai';

export enum Routes {
  Home,
  Timeline,
  Dashboard,
}

export const routeAtom = atom(Routes.Home);
