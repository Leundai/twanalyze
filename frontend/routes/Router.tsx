import { useAtom } from 'jotai';
import React from 'react';
import useMonitorHandleForFetching from '../hooks/useMonitorHandle';
import { routeAtom, Routes } from '../state/routeAtom';
import Home from './Home';
import Timeline from './Timeline';

export default function Router() {
  useMonitorHandleForFetching();

  const [route, setRoute] = useAtom(routeAtom);

  switch (route) {
    case Routes.Home:
      return <Home />;
    case Routes.Timeline:
      return <Timeline />;
    case Routes.Dashboard:
      return <Home />;
    default:
      return <></>;
  }
}
