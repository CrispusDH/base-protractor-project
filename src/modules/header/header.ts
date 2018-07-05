import { $ } from 'protractor';
import { Search } from 'src/modules/header/entities/search';

export class Header {
  public readonly search: Search;

  constructor() {
    this.search = new Search($('#search'));
  }
}
