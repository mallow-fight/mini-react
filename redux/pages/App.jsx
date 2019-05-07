import {connect, getState} from '../packages/redux';
import React, { Component } from 'react';
import Person from './Person';
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
  render() {
    const {
      name,
      age
    } = this.props.user;
    return (
      <div>
        <p>My name is {name}, my age is {age}.</p>
        <Person name={name} age={age} />
      </div>
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