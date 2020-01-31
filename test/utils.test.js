import parseStringAsArray from '../src/app/utils/parseStringAsArray';

describe('Test utils functions', () => {

  test('Parse a string as array', () => {
    const techs = 'Java, Kotlin, NodeJs, Swift, Flutter, Dart';
    const result = parseStringAsArray(techs, ',');

    expect(Array.isArray(result)).toBeTruthy();
  });

  test('Parse string without delimiter', () => {
    const techs = 'NodeJs Swift';
    const result = parseStringAsArray(techs, ',');

    expect(Array.isArray(result)).toBeTruthy();
  });

});