import { Verify, WaitConditions } from '@src/utils';
import { protractor } from 'protractor';
import { BaseFragment } from 'protractor-element-extend';

export class Fragment extends BaseFragment {

  public async getFragmentText(): Promise<string> {
    try {
      await this.waitForVisible();
    } catch (e) {
      throw new Error(`Can not get fragment text of not visible fragment. ${e}`);
    }
    return await this.getText();
  }

  public async clickOn(): Promise<void> {
    try {
      await this.waitForClickable();
    } catch (e) {
      throw new Error(`Can not click on fragment of not clickable fragment. ${e}`);
    }
    await this.click();
  }

  public async getDataTestId(): Promise<string> {
    return await this.getFragmentAttribute('data-test-id');
  }

  public async pressEscape(): Promise<void> {
    try {
      await this.waitForVisible();
    } catch (e) {
      throw new Error(`Can not press escape of not visible fragment. ${e}`);
    }
    await this.sendKeys(protractor.Key.ESCAPE);
  }

  public async type(text: string): Promise<void> {
    await this.clearInput();
    await this.sendKeys(text);
  }

  public async clearInput(): Promise<void> {
    try {
      await this.waitForVisible();
    } catch (e) {
      throw new Error(`Can not clear the input of not visible fragment. ${e}`);
    }
    await this.clear();
  }

  public async getFragmentAttribute(name: string): Promise<string> {
    try {
      await this.waitForVisible();
    } catch (e) {
      throw new Error(`Can not get attribute ${name} of not visible fragment. ${e}`);
    }

    return await this.getAttribute(name);
  }

  public async waitForVisible(): Promise<void> {
    await WaitConditions.visible(this);
  }

  public async waitForNotVisible(): Promise<void> {
    await WaitConditions.invisible(this);
  }

  public async waitForClickable(): Promise<void> {
    await WaitConditions.clickable(this);
  }

  /**
   * Double-clicks a mouse button.
   *
   * DoubleClick() from ActionSequence class doesn't work properly
   * on Chrome
   *
   */
  public async doubleClick(): Promise<void> {
    await this.clickOn();
    await this.clickOn();
  }

  public async isClassAttributeIncludes(substring: string): Promise<boolean> {
    return (await this.getFragmentAttribute('class')).includes(substring);
  }

  public async expectToContainText(substring: string): Promise<void> {
    await Verify.textContains(
      () => this.getFragmentText(),
      substring
    );
  }

  public async expectToNotContainText(substring: string): Promise<void> {
    await Verify.textNotContains(
      () => this.getFragmentText(),
      substring
    );
  }

  public async expectClassToContain(substring: string): Promise<void> {
    await this.expectToContainTextInAttribute('class', substring);
  }

  public async expectClassToNotContain(substring: string): Promise<void> {
    await this.expectToNotContainTextInAttribute('class', substring);
  }

  public async expectToContainTextInAttribute(attribute: string, substring: string): Promise<void> {
    await Verify.textContains(
      () => this.getFragmentAttribute(attribute),
      substring
    );
  }

  public async expectToNotContainTextInAttribute(attribute: string, substring: string): Promise<void> {
    await Verify.textNotContains(
      () => this.getFragmentAttribute(attribute),
      substring
    );
  }
}
