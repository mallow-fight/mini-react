import {connect, getState} from '../packages/redux';
import React, { Component } from 'react';
class App extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'updateUser',
      payload: {
        name: 'Lucy',
        age: 16
      }
    })
  }
  static getDerivedStateFromProps(props, state) {
    
  }
  render() {
    const {
      name,
      age
    } = this.props.user;
    return (
      <div>My name is {name}, my age is {age}.</div>
    )
  }
}

export default connect({
  mapStateToProps: (state) => {
    return {
      user: state.user
    }
  },
  mapDispatcherToProps: (dispatchers) => {
    return {
      updateUser: dispatchers.updateUser
    }
  }
})(App);