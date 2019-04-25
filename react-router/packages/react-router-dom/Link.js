import React from 'react';

class Link extends React.Component {
  state = {
    name: 'Link',
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
export default Link;
