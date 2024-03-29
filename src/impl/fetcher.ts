import { Options } from '../options.ts';

/**
 * fetch the code from the server
 * @throws an Error when res.ok is false (and passes on native fetch errors)
 * @param url A string that provides the URL of the resource you want to fetch.
 * @param options
 */
export async function fetchCode(url: string, options: Options) {
    const res = await fetch(url);
    if (res.ok) {
        const code = await res.text();
        if (options.codeBlock.trim) return code.trim();
        else return code;
    } else {
        throw new Error(res.statusText);
    }
}
