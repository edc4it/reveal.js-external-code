import { Options as RevealOptions } from 'reveal.js';
import { DeepPartial } from './util/utility-types.ts';

export type CodeBlockOptions = {
    trim: boolean;
    additionalClasses: string[];
};

export type LocalOptions = {
    scheme: 'vscode://file//' | string;
    absPath?: string;
};
export type Options = {
    basePath: string;
    local: LocalOptions;
    codeBlock: CodeBlockOptions;
    enableNotify: boolean;
};

export const defaultOptions: Options = {
    basePath: '/',
    enableNotify: true,
    codeBlock: {
        trim: true,
        additionalClasses: [],
    },
    local: {
        scheme: 'vscode://file//',
    },
};

export type AugmentedRevealOptions = RevealOptions & { externalCode?: DeepPartial<Options> };
