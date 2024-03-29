import { expect, test } from 'vitest';
import { fileParser } from '../../../../src/impl/parsers/file-parser';

const fileWithoutRange = `
# @reveal.js/code
line 1
`.trim();

const fileWithRange = `
# @reveal.js/code lines=2-4, 4
line 1
line 2
line 3
line 4
line 5
`.trim();


test('to strip the first line with the annotation', () => {
  const r = fileParser(fileWithoutRange);
  expect(r.lines[0]).toBe('line 1');
});


test('not to return a range if none given', () => {
  const r = fileParser(fileWithoutRange);
  expect(r.range).toBeUndefined();
});


test('to return a range', () => {
  const r = fileParser(fileWithRange);
  expect(r.range).toBeDefined();
});

test('the range is adjusted', () => {
  const r = fileParser("@reveal.js/code lines=2-4, 4");
  expect(r.range).toStrictEqual([
    { start: 1, end: 3 },
    { start: 3, end: 3 }],
  );
});
