import { parseRange, Range } from './range-parser.ts';

export interface ParseResult {
  lines: string[];
  range?: Range[];
  annotated: boolean;
}

export function fileParser(code: string): ParseResult {
  const strings = code.split('\n');
  const prelude = strings[0];

  if (prelude.includes('@reveal.js/code')) {
    const annotations: string = prelude;
    const ranges = annotations.match(/lines=(['"]?(?<range>[\d,\s-]+)['"]?)/)?.groups?.range;
    const lines = strings.slice(1);
    if (ranges) {
      const range = parseRange(ranges, true);

      return {
        lines,
        range,
        annotated: true,
      };
    } else {
      return {
        lines,
        annotated: true,
      };
    }
  } else {
    return {
      lines: strings,
      annotated: false,
    };
  }
}
