import getComponentType from '../getComponentType';

describe('getComponentType', () => {
  test('return simple when it only has tag', () => {
    expect(getComponentType({ tag: 'test' })).toBe('simple');
    expect(getComponentType({ tag: 'div' })).toBe('simple');
  });
  test('return normal when it tag is string and children is not null', () => {
    expect(getComponentType({ tag: 'div', children: [] })).toBe('normal');
    expect(getComponentType({ tag: 'div', children: ['test'] })).toBe('normal');
    expect(getComponentType({ tag: 'p', props: null, children: ['app1'] })).toBe('normal');
  });
  test('return complex when it tag is function', () => {
    expect(getComponentType({ tag: function App() {} })).toBe('complex');
    expect(getComponentType({ tag: function Zoo() {}, props: { name: 'Zoo' } })).toBe('complex');
    expect(getComponentType({ tag: function Foo() {}, props: { name: 'Foo' }, children: [] })).toBe('complex');
  });
});
