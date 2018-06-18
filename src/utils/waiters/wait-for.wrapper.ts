import { Constants } from '@src/utils';
import { browser } from 'protractor';
import { promise, until, WebDriver } from 'selenium-webdriver';

// tslint:disable ban-types
export async function waitFor(
  condition: Function | until.Condition<{}> | promise.Promise<{}> | ((driver: WebDriver) => {}),
  message: string,
  timeout: number = Constants.waitPreset.waitCondition.defaultTimeout
): Promise<void> {
  await browser.wait(
    condition,
    timeout,
    message
  );
}
