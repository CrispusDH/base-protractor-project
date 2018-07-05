import { $, ElementFinder } from 'protractor';
import { Fragment } from '@src/utils';

export class Search extends Fragment {
  public readonly searchInput: Fragment;
  public readonly searchButton: Fragment;

  constructor(search: ElementFinder) {
    super(search);

    this.searchInput = new Fragment($('#search-input #search'));
    this.searchButton = new Fragment($('#search-icon-legacy'));
  }

  public async search(text: string): Promise<void> {
    await this.typeSearch(text);
    await this.submitSearch();
  }

  public async submitSearch(): Promise<void> {
    await this.searchButton.clickOn();
  }

  public async typeSearch(text: string): Promise<void> {
    await this.searchInput.clickOn();
    await this.searchInput.type(text);
  }
}
