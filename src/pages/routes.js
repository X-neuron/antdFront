
import React from 'react';
// import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import loadable from '@loadable/component';
// import Loadable from 'react-loadable';
// import { Router, Link } from '@reach/router';
import { Router } from '@reach/router';
// import { Link, Route } from 'wouter';


const Form1 = loadable(() => import('./test1/1'));
const Form2 = loadable(() => import('./test2/2'));
const DateLocales = loadable(() => import('./test3/date'));
// const Form1 = Loadable({
//   loader: () => import('./pages/test1/1'),
//   loading: <p> loading</p>
// });

// const Form2 = Loadable({
//   loader: () => import('./pages/test2/2'),
//   loading: <p> loading</p>
// });

// const selectStyle = {
//   color:'red',
//   fontWeight: 'bold'
// }

function RouteExample() {
  return (
    <>
      {/* <ul>
        <li>
          <Link href="/" to="/">
            <a> Form1 </a>
          </Link>
        </li>
        <li>
          <Link href="a" to="/a">
            <a> Form2 </a>
          </Link>
        </li>
      </ul> */}
      {/* <hr /> */}
      {/* <Route path="/" component={HomePage} /> */}
      {/* wouter Text */}
      {/* <Route path="/" component={Form1} />
      <Route path="/a" component={Form2} /> */}
      {/* @reach/router test */}
      <Router>
        <Form1 path="/" />
        <Form2 path="a" />
        <DateLocales path="c" />
      </Router>
    </>
  )
}

export default RouteExample;
