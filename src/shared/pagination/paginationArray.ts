import { ELLIPSIS_CHAR } from 'utils';

class Char {
  constructor(public sign: string, public className?: string) {}
}

class LinkChar extends Char {
  public isLink: true = true;
  constructor(sign: string, public to: string, className?: string) {
    super(sign, className);
  }
}

class PlainChar extends Char {
  public isLink: false = false;
  constructor(sign: string, className?: string) {
    super(sign, className);
  }
}

type AnyChar = LinkChar | PlainChar;

export default class PaginationArray {
  protected paginationArray: AnyChar[] = [];
  protected prevPage: string = '';
  protected nextPage: string = '';
  protected currentPageChar: AnyChar | null = null;
  protected ellipsisChar: AnyChar;

  constructor(protected numberOfPages: number) {
    this.ellipsisChar = new PlainChar(ELLIPSIS_CHAR, 'pagination__ellipsis');
  }

  getArray(currentPage: number): AnyChar[] {
    this.prevPage = String(currentPage - 1);
    this.nextPage = String(currentPage + 1);
    this.currentPageChar = new PlainChar(
      String(currentPage),
      'pagination__current-page'
    );

    this.setPrevLinks(currentPage);
    this.setCurrentLink();
    this.setNextLinks(currentPage);

    return this.paginationArray;
  }

  setPrevLinks(currentPage: number) {
    if (currentPage !== 1) {
      const { paginationArray, prevPage, ellipsisChar } = this;

      paginationArray.push(new LinkChar('<', prevPage));

      if (prevPage !== '1') {
        paginationArray.push(new LinkChar('1', '1'));
      }

      if (+prevPage > 2) {
        paginationArray.push(ellipsisChar);
      }

      paginationArray.push(new LinkChar(prevPage, prevPage));
    }
  }

  setCurrentLink() {
    this.paginationArray.push(this.currentPageChar!);
  }

  setNextLinks(currentPage: number) {
    const { paginationArray, nextPage, numberOfPages, ellipsisChar } = this;

    if (currentPage < numberOfPages) {
      paginationArray.push(new LinkChar(nextPage, nextPage));

      if (+nextPage < numberOfPages - 1) {
        paginationArray.push(ellipsisChar);
      }

      if (nextPage !== String(numberOfPages)) {
        paginationArray.push(
          new LinkChar(String(numberOfPages), String(numberOfPages))
        );
      }

      paginationArray.push(new LinkChar('>', nextPage));
    }
  }
}
