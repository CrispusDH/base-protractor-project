import { ElementFinder, ExpectedConditions as EC } from 'protractor';
import { waitFor } from '@src/utils/waiters/wait-for.wrapper';
import { ArrayFragment } from '@src/utils/fragment/array-fragment.wrapper';
import { Fragment } from '@src/utils/fragment/fragment.wrapper';
import { Predicates } from '@src/utils/waiters/predicates';

export class WaitConditions {
  public static async clickable(element: ElementFinder): Promise<void> {
    await waitFor(
      EC.elementToBeClickable(element),
      `${element.locator()} was expected to be clickable`
    );
  }

  public static async visible(element: ElementFinder): Promise<void> {
    await waitFor(
      EC.visibilityOf(element),
      `${element.locator()} was expected to be visible`
    );
  }

  public static async invisible(element: ElementFinder): Promise<void> {
    await waitFor(
      EC.invisibilityOf(element),
      `${element.locator()} was expected to be invisible`
    );
  }

  public static async arrayIsNotEmpty(array: ArrayFragment<Fragment>): Promise<void> {
    await waitFor(
      Predicates.isArrayNotEmpty(array),
      'Array of fragments expected to be not empty'
    );
  }
}
