import React from 'react';

export default function Person({ name, age }) {
  return (
    <div>
      <p>
Person-Name:
        {' '}
        {name}
      </p>
      <p>
Person-Age:
        {' '}
        {age}
      </p>
    </div>
  );
}
