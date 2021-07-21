import React from 'react';
import App from './app';
import {
  Link,
  BrowserRouter as Router,
  withRouter,
  Route,
} from 'react-router-dom';

const landing = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/app">Pleiepengeskjema</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
};

export default landing;
