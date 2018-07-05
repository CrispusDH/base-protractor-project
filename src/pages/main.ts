import { Page } from '@src/utils';
import { Header } from '@src/modules';

export class Main extends Page {
  public readonly header: Header;

  constructor() {
    super();

    this.header = new Header();
  }
}
