import React, { Component } from 'react';

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
        {children}
        <p>my name is:</p>
        <p>{this.state.name}</p>
      </div>
    );
  }
}
