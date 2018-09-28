import { browser } from 'protractor';
import { Condition, promise, WebDriver } from 'selenium-webdriver';
import { Constants } from '@src/utils/constants';

// tslint:disable ban-types
export async function waitFor(
  condition: Function | Condition<{}> | promise.Promise<{}> | ((driver: WebDriver) => {}),
  message: string,
  timeout: number = Constants.waitPreset.waitCondition.defaultTimeout
): Promise<void> {
  await browser.wait(
    condition,
    timeout,
    message
  );
}
