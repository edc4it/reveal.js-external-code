export type Range = {
    start: number;
    end: number;
};

export class RangeParseError extends Error {
    constructor(m: string) {
        super(m);
    }
}

/**
 *
 * @param ranges comma-seperated ranges
 * @param adjust if to shift the range by -1 (e.g., because of stripping `@reveal.js/code`)
 */
export function parseRange(ranges: string, adjust : boolean = false): Range[] {
    const adjustment = adjust ? -1 : 0
    const rangeNoSpaces = ranges.replace(/\s/g, '');
    return rangeNoSpaces.split(',').map((range) => {
        const containsRange = /^[\d-]+$/.test(range);
        if (containsRange) {
            const [lineStart, lineEnd] = range.split('-').map((e) => Number.parseInt(e, 10) + adjustment);
            const singleDigit = isNaN(lineEnd);
            if (singleDigit) {
                return {
                    start: lineStart,
                    end: lineStart,
                };
            } else {
                return {
                    start: lineStart,
                    end: lineEnd,
                };
            }
        } else throw new RangeParseError(`could not parse ${range}`);
    });
}
