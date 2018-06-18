import { browser } from 'protractor';

describe('Init test', () => {
  it('Given a base page', async () => {
    await browser.get('https://www.youtube.com/');
  });

  it('then YouTube page has specific url', async () => {
    expect(await browser.getCurrentUrl()).toBe('https://www.youtube.com/');
  });
});
