import { ElementFinder } from 'protractor';
import { Fragment } from '@src/utils/fragment/fragment.wrapper';
import { ArrayFragment } from '@src/utils/fragment/array-fragment.wrapper';
import { WaitConditions } from '@src/utils/waiters/wait-conditions';

export class DropDown extends Fragment {
  private readonly options: ArrayFragment<Fragment>;

  constructor(dropdown: ElementFinder) {
    super(dropdown);

    this.options = new ArrayFragment<Fragment>(this.$$('option'), Fragment);
  }

  public async selectOptionByValue(value: string): Promise<void> {
    await this.open();
    await WaitConditions.arrayIsNotEmpty(this.options);
    const option = await this.options.find(async (opt) => {
      return await opt.getFragmentText() === value;
    });
    await option.clickOn();
  }

  private async open(): Promise<void> {
    await this.clickOn();
  }
}
