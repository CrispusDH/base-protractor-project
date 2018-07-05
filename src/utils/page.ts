import { browser } from 'protractor';

export abstract class Page {
  public async getUrl(): Promise<string> {
    return await browser.getCurrentUrl();
  }
}
