import React, { Component } from '../../packages/react';

export default class Garden extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'garden',
    };
  }

  componentWillMount() {
    this.setState({
      name: 'garden-updated',
    });
  }

  componentDidMount() {
    this.setState({
      name: 'hahaha',
    });
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <p>my children is:</p>
        <p>{children}</p>
        <p>my name is:</p>
        <p>{this.state.name}</p>
      </div>
    );
  }
}
