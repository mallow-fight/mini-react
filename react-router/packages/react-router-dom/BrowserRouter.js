import React from 'react';

class BrowserRouter extends React.Component {
  state = {
    name: 'BrowserRouter',
  }

  render() {
    const {
      state: {
        name,
      },
    } = this;
    return (
      <div>{name}</div>
    );
  }
}
export default BrowserRouter;
