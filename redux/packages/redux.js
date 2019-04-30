import React from 'react';

const instance = [];
const store = {
  user: {
    name: 'mallow',
    age: 18,
  },
};

const reducers = {
  updateUser: (payload, state) => ({
    user: {
      ...state.user,
      ...payload,
    },
  }),
};

const commit = ({ type, payload }) => {
  const updater = reducers[type](payload, store);
  const updaterKeys = Object.keys(updater);
  updaterKeys.forEach((key) => {
    store[key] = updater[key];
  });
  return store;
};

const dispatchers = {
  updateUser: ({ type, payload }) => commit({ type, payload }),
};
function connect(methods) {
  const {
    mapStateToProps,
    mapDispatcherToProps,
  } = methods;
  return function connectMethods(Target) {
    const storeProps = mapStateToProps(store);
    const dispatchersProps = mapDispatcherToProps(dispatchers);
    const dispatch = ({ type, payload }) => commit({ type, payload });
    return function wrapperProps(props) {
      const wrapperedProps = {
        ...props,
        ...storeProps,
        ...dispatchersProps,
        dispatch,
      };
      // Target.getDerivedStateFromProps = function(props, state) {

      // }
      return <Target {...wrapperedProps} />;
    };
  };
}

function getState(key) {
  if (!key) return store;
  return store[key];
}

export {
  connect,
  getState,
};
