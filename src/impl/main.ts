import { Options } from '../options.ts';
import { fileParser } from './parsers/file-parser.ts';
import { stripLines } from './stripper.ts';
import { Structure } from './view/structure.ts';
import { fetchCode } from './fetcher.ts';
import Notify from 'simple-notify';
import { parseRange } from './parsers/range-parser.ts';
import { replace } from '../util/dom-utils.ts';
import { getAbsUrl } from '../util/url-util.ts';

function getSelectedCode(contents: string, dataLines: string | null) {
    const { range: embeddedRange, lines,annotated } = fileParser(contents);

    const providedRange = dataLines ? parseRange(dataLines, annotated) : undefined;

    const ranges = embeddedRange ?? providedRange;
    const selectedLines = ranges ? stripLines(lines, ranges) : lines;
    return selectedLines.join('\n');
}

export async function run(revealElement: HTMLElement, options: Options) {
    const es = revealElement.querySelectorAll<HTMLObjectElement>("object[type='reveal.js/code']");
    const r = Array.from(es).map(async (e) => {
        const src = e.getAttribute('data-src');
        const dataLines = e.getAttribute('data-lines');
        if (src) {
            const relUri = getAbsUrl(options.basePath,src);
            try {
                const contents = await fetchCode(relUri, options);
                if (contents) {
                    const code = getSelectedCode(contents, dataLines);
                    const structure = new Structure(e.attributes, src, relUri, code, options);
                    const html = structure.create()
                    replace(e, html);
                }
            } catch (e) {
                const error = `exception while processing external code ${src}`;
                if (options.enableNotify) {
                    new Notify({ text: error });
                }
                console.error(error, e)
            }
        } else {
            console.error("object[type='reveal.js/code'] has no src attribute", e);
        }
    });
    return Promise.all(r);
}
