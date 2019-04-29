import React from 'react';
import { render } from 'react-dom';
import App from './pages/App';
import './index.less';
import {HashRouter, HashRoute} from './packages/hash';
import {HistoryRouter, HistoryRoute, Link} from './packages/history';

const hash1 = () => <div>i am hash1.</div>
const hash2 = () => <div>i am hash2.</div>
const history1 = () => <div>i am history1.</div>
const history2 = () => <div>i am history2.</div>
render(
  <div>
    <div className="hash-container">
      <p>
        Hash路由实现
      </p>
      <HashRouter>
        <p>
          <a href="#hash1">hash1</a>
        </p>
        <p>
          <a href="#hash2">hash2</a>
        </p>
        <HashRoute path="hash1" component={hash1} />
        <HashRoute path="hash2" component={hash2} />
      </HashRouter>
    </div>
    <div className="history-container">
      <p>
        History路由实现
      </p>
      <HistoryRouter>
        <Link to="/history1">history1</Link>
        <hr />
        <Link to="/history2">history2</Link>
        <hr />
        <HistoryRoute path="/history1" component={history1} />
        <HistoryRoute path="/history2" component={history2} />
      </HistoryRouter>
    </div>
    <App name="project-origin" version="1.0.0" />
  </div>,
  document.getElementById('app'),
);
