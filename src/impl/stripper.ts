import { Range } from './parsers/range-parser.ts';

/**
 * strips lines using the provided range
 * @param lines
 * @param ranges
 */
export function stripLines(lines: string[], ranges: Range[]) {
  return lines
    .map((l, i) => (includes(i + 1, ranges) ? l : '…'))
    .filter((l, i, all) => !(l === '…' && all[i - 1] === '…'));
}

function includes(i: number, lines: Range[]) {
  return lines.find((lines) => i >= lines.start && i <= lines.end) !== undefined;
}
