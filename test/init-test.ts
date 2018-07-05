import { browser } from 'protractor';
import { Main } from '@src/pages/main';

describe('Init test', () => {
  it('Given a base page', async () => {
    await browser.get('https://www.youtube.com/');
  });

  it('Then YouTube page has specific url', async () => {
    expect(await browser.getCurrentUrl()).toBe('https://www.youtube.com/');
  });

  it('When search "Levis"', async () => {
    const main = new Main();
    await main.header.search.search('Levis');
    // Probably you will want to see that you on the expected page
    await browser.sleep(5000);
  });
});
