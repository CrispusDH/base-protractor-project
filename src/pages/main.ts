import { Page } from '@src/utils/page';
import { Header } from '@src/modules/header/header';

export class Main extends Page {
  public readonly header: Header;

  constructor() {
    super();

    this.header = new Header();
  }
}
