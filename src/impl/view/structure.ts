import { Options } from '../../options.ts';
import { cloneAttributes } from '../../util/dom-utils.ts';
import { getFileSuffix } from '../../util/file-util.ts';
import './main.css';

export class Structure {
  private readonly providedLanguage?: string;

  constructor(
    private readonly attributes: NamedNodeMap,
    private readonly src: string,
    private readonly href: string,
    private readonly codeStr: string,
    private readonly options: Pick<Options, 'local' | 'codeBlock'>,
  ) {
    this.providedLanguage = this.attributes.getNamedItem('data-lang')?.value;
  }

  create() {
    const { wrapper, codeElement } = this._createElements();
    const classes = this._codeClasses();

    codeElement.classList.add(...classes);
    cloneAttributes([...this.attributes].filter(a => a.nodeName !== 'class'), codeElement);

    codeElement.innerHTML = this.codeStr;

    return wrapper;
  }

  /**
   * Create the required elements
   * @private
   * @returns the wrapper and the code element for further processing
   */
  private _createElements() {
    const wrapper = this._createWrapper();
    const preElement = document.createElement('pre');
    const codeElement = document.createElement('code');
    const footerHtml = this._footerHtml();

    wrapper.appendChild(preElement);
    preElement.appendChild(codeElement);
    preElement.insertAdjacentHTML('afterend',footerHtml)

    return { wrapper, codeElement };
  }

  /**
   * constructs the list of classes for the code element
   * @private
   */
  private _codeClasses() {
    const fileSuffix = getFileSuffix(this.src);
    const syntax = this.providedLanguage ?? fileSuffix ?? '';
    return [...this.options.codeBlock.additionalClasses, syntax];
  }

  /**
   * Create the footer html with a link to the external code
   * @param preElement
   * @private
   */
  private _footerHtml() {
    const link = this.options?.local.absPath ? `${this.options.local.scheme}${this.options?.local.absPath}/${this.src}` : this.href;
    return `<footer class="demo-ref"><a href="${link}">${this.src}</a></footer>`
  }

  /**
   * Create the outer wrapper
   * @private
   */
  private _createWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('external-code-wrapper');
    wrapper.classList.add(...(this.attributes.getNamedItem('class')?.value.split(' ') ?? []));
    return wrapper;
  }

}



