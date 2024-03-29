import { expect, test } from 'vitest';
import { parseRange } from '../../../../src/impl/parsers/range-parser.ts';




test('single line range', () => {
  const ranges = parseRange('19');
  expect(ranges).toStrictEqual([{ start: 19, end: 19 }]);
});

test('single  range', () => {
  const ranges = parseRange('19-24');
  expect(ranges).toStrictEqual([{ start: 19, end: 24 }]);
});

test('two ranges', () => {
  const ranges = parseRange('19-24, 69-98');
  expect(ranges).toStrictEqual([
    { start: 19, end: 24 },
    { start: 69, end: 98 },
  ]);


});

test('a ranges and a single range', () => {
  const ranges = parseRange('19-24, 120');
  expect(ranges).toStrictEqual([
    { start: 19, end: 24 },
    { start: 120, end: 120 },
  ]);
});

test('can be "adjusted"', () => {
  const ranges = parseRange('19-24', true);
  expect(ranges).toStrictEqual([
    { start: 18, end: 23 },
  ]);
});
