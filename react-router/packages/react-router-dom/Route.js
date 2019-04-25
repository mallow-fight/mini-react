import React from 'react';

class Route extends React.Component {
  state = {
    name: 'Route',
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
export default Route;
