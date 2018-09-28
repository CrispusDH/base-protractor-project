import { BooleanSupplier, NumberSupplier, StringSupplier, Supplier } from '@src/utils/waiters/overload-helpers';
import { Predicates } from '@src/utils/waiters/predicates';
import { waitFor } from '@src/utils/waiters/wait-for.wrapper';

export class Verify {
  public static async toBeTruthy(getBoolean: BooleanSupplier): Promise<void> {
    await waitFor(
      Predicates.isTruthy(getBoolean),
      'Given condition produced negative result'
    );
  }

  public static async textContains(
    getText: StringSupplier,
    getSubString: StringSupplier
  ): Promise<void> {
    await waitFor(
      Predicates.isTextContain(getText, getSubString),
      'Given text does not contain substring'
    );
  }

  public static async numbersAreEqual(
    getFirst: NumberSupplier,
    getSecond: NumberSupplier
  ): Promise<void> {
    await waitFor(
      Predicates.areEqualNumbers(getFirst, getSecond),
      'Given numbers are not equal'
    );
  }

  public static async stringsAreEqual(
    getFirst: StringSupplier,
    getSecond: StringSupplier
  ): Promise<void> {
    await waitFor(
      Predicates.areEqualStrings(getFirst, getSecond),
      'Given strings are not equal',
    );
  }

  public static async stringsAreNotEqual(
    getFirst: StringSupplier,
    getSecond: StringSupplier
  ): Promise<void> {
    await waitFor(
      Predicates.areNotEqualStrings(getFirst, getSecond),
      'Given strings are equal'
    );
  }

  public static async textNotContains(getText: Supplier<string>, substring: string): Promise<void> {
    await waitFor(
      Predicates.isTextNotContain(getText, substring),
      `Given text does not contain "${substring}"`
    );
  }

  public static async objectsAreEqual(getObject: Supplier<object>, object: object): Promise<void> {
    await waitFor(
      Predicates.areEqualObjects(getObject, object),
      'Objects are not equal'
    );
  }

  public static async greaterThan(getNumber: Supplier<number>, secondNumber: number): Promise<void> {
    await waitFor(
      Predicates.isGreaterThan(getNumber, secondNumber),
      `${await getNumber()} is not greater than ${secondNumber}`
    );
  }

  public static async lessThan(getNumber: Supplier<number>, secondNumber: number): Promise<void> {
    await waitFor(
      Predicates.isLessThan(getNumber, secondNumber),
      `${await getNumber()} is not greater than ${secondNumber}`
    );
  }

  public static async valueIsNotDefined<T>(getValue: Supplier<T>): Promise<void> {
    await waitFor(
      Predicates.isValueNotDefined(getValue),
      `Verify.valueIsNotDefined: ${await getValue()} is defined`
    );
  }

  public static async arrayIncludesSubArray(
    getSourceArray: Supplier<Array<string>>,
    subArray: Array<string>
  ): Promise<void> {
    await waitFor(
      Predicates.isArrayIncludesSubArray(getSourceArray, subArray),
      'Source array does not include sub array'
    );
  }

  public static async arrayDoesNotIncludeSubArray(
    getSourceArray: Supplier<Array<string>>,
    subArray: Array<string>
  ): Promise<void> {
    await waitFor(
      Predicates.isArrayNotIncludesSubArray(getSourceArray, subArray),
      'Source array includes sub array. But should not!'
    );
  }
}
