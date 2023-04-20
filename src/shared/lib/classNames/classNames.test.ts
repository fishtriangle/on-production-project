import { classNames } from './classNames';

describe('classNames utility', () => {
  test('with only one param', () => {
    expect(classNames('someClass')).toBe('someClass');
  });

  test('with additional class', () => {
    const expected = 'someClass testClass1 testClass2';
    expect(classNames('someClass', {}, ['testClass1', 'testClass2']))
      .toBe(expected);
  });

  test('with mods', () => {
    const expected = 'someClass testClass1 testClass2 hovered scrollable';
    expect(classNames(
      'someClass',
      { hovered: true, scrollable: true },
      ['testClass1', 'testClass2'],
    ))
      .toBe(expected);
  });

  test('with false mod', () => {
    const expected = 'someClass testClass1 testClass2 hovered';
    expect(classNames(
      'someClass',
      { hovered: true, scrollable: false },
      ['testClass1', 'testClass2'],
    ))
      .toBe(expected);
  });

  test('with underfined mod', () => {
    const expected = 'someClass testClass1 testClass2 hovered';
    expect(classNames(
      'someClass',
      { hovered: true, scrollable: undefined },
      ['testClass1', 'testClass2'],
    ))
      .toBe(expected);
  });
});
