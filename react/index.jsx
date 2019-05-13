import React from './packages/react';
import { render } from './packages/react-dom';
import App from './pages/App';

render(
  <App name="project-origin" version="1.0.0" />,
  document.getElementById('app'),
);


// render(
//   {
//     tag,
//     props,
//     children,
//     type: getComponentType({ tag, props, children }),
//   },
//   document.getElementById('app'),
// )