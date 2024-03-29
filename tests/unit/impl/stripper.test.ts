import { expect, test } from 'vitest';
import { stripLines } from '../../../src/impl/stripper';


const file = `
line 1
line 2
line 3
line 4
line 5
`.trim().split('\n');

test('single line range', () => {
  const r = stripLines(file, [{ start: 1, end: 1 }]);
  expect(r).toStrictEqual([
    'line 1',
    '…',
  ]);
});

test('single range', () => {

  const r = stripLines(file, [{ start: 2, end: 3 }]);
  expect(r).toStrictEqual([
    '…',
    'line 2',
    'line 3',
    '…',
  ]);
});

test('two ranges range', () => {

  const r = stripLines(file, [{ start: 1, end: 2 }, { start: 4, end: 5 }]);
  expect(r).toStrictEqual([
    'line 1',
    'line 2',
    '…',
    'line 4',
    'line 5',
  ]);
});


