import { isObjectEmpty } from 'utils/helpers';

describe('isObjectEmpty helper', () => {
  test('object should be empty', () => {
    const input = {};
    expect(isObjectEmpty(input)).toBeTruthy();
  });

  test('object should be empty', () => {
    const input = {
      a: 'hello',
      b: 'world'
    };
    expect(isObjectEmpty(input)).toBeFalsy();
  });
});
