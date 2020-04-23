import { lazy } from 'react';

const Dashboard = lazy(() => import('./dashboard'));
const Test1 = lazy(() => import('./test1'));
const Test2 = lazy(() => import('./test2'));
const Test3 = lazy(() => import('./test3'));

export default {
  Dashboard,
  Test1,
  Test2,
  Test3,
}
