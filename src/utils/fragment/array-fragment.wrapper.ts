import { Fragment } from '@src/utils';
import { BaseArrayFragment } from 'protractor-element-extend';
import { promise as wdpromise } from 'selenium-webdriver';

export class ArrayFragment<T extends Fragment> extends BaseArrayFragment<T> {
  public filter(
    filterFn: (elementFinder?: T, index?: number) => boolean | wdpromise.Promise<boolean> | Promise<boolean>
  ): this {
    return super.filter(this.makeFnSequential(filterFn));
  }

  public async find(
    filterFn: (elementFinder?: T, index?: number) => boolean | wdpromise.Promise<boolean> | Promise<boolean>
  ): Promise<T> {
    const count = await this.count();
    if (count === 0) {
      throw new Error('Wow, you try to apply find() on empty Array');
    }
    for (let i = 0; i < count; i++) {
      const fragment = await this.get(i);
      if (await filterFn(fragment, i)) {
        return fragment;
      }
    }
    throw new Error('Find function did not match any fragment');
  }

  /**
   *
   * Represents the ArrayFragment as an array of Fragments.
   *
   * @returns {Array<Fragment>} Returns a promise, which resolves
   * to a list of Fragments.
   */
  public async asFragments(): Promise<T[]> {
    const fragments: T[] = [];
    await this.each((fragment) => fragments.push(fragment));
    return fragments;
  }

  public map(mapFn: (elementFinder?: T, index?: number) => any): wdpromise.Promise<any[]> {
    return super.map(this.makeFnSequential(mapFn));
  }

  public reduce(
    reduceFn: (value?: any, elementFinder?: T, index?: number, arr?: any) => any,
    initialValue: any
  ): wdpromise.Promise<any> {
    return super.reduce(this.makeFnSequential(reduceFn), initialValue);
  }

  public each(fn: (elementFinder?: T, index?: number) => any): wdpromise.Promise<any> {
    return super.map(this.makeFnSequential(fn)).then((): any => {
      return null;
    });
  }

  private makeFnSequential(func: any): any {
    let promise: any = Promise.resolve();

    return (...args) => {
      promise = promise.then(() => {
        return func(...args);
      });

      return promise;
    };
  }
}
