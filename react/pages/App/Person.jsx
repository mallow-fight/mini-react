import React from '../../packages/react';

export default function Person(props) {
  const {name} = props;
  return (
    <div>
      <p>{name}</p>
      <p>age is 25.</p>
    </div>
  );
}
