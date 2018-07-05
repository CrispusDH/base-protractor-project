import {
  ArrayFragment,
  booleanOverload,
  BooleanSupplier,
  Fragment,
  numberOverload,
  NumberSupplier,
  stringOverload,
  StringSupplier,
  Supplier
} from '@src/utils';

export class Predicates {
  public static isArrayNotEmpty(array: ArrayFragment<Fragment>): Supplier<boolean> {
    return async () => {
      return await array.count() > 0;
    };
  }

  public static isTextContain(
    getText: StringSupplier,
    getSubString: StringSupplier
  ): Supplier<boolean> {
    return async () => {
      const text = await stringOverload(getText);
      const substring = await stringOverload(getSubString);
      return text.includes(substring);
    };
  }

  public static isTextNotContain(getText: Supplier<string>, substring: string): Supplier<boolean> {
    return async () => {
      const text = await getText();
      return !text.includes(substring);
    };
  }

  public static areEqualNumbers(
    getFirst: NumberSupplier,
    getSecond: NumberSupplier
  ): Supplier<boolean> {
    return async () => {
      const first = await numberOverload(getFirst);
      const second = await numberOverload(getSecond);
      return first === second;
    };
  }

  public static areEqualStrings(
    getFirst: StringSupplier,
    getSecond: StringSupplier
  ): Supplier<boolean> {
    return async () => {
      const first = await stringOverload(getFirst);
      const second = await stringOverload(getSecond);
      return first === second;
    };
  }

  public static areNotEqualStrings(
    getFirst: StringSupplier,
    getSecond: StringSupplier
  ): Supplier<boolean> {
    return async () => {
      const first = await stringOverload(getFirst);
      const second = await stringOverload(getSecond);
      return first !== second;
    };
  }

  public static areEqualObjects(getObject: Supplier<object>, object: object): Supplier<boolean> {
    return async () => {
      const firstObject = await getObject();
      const firstProps = Object.getOwnPropertyNames(firstObject);
      const secondProps = Object.getOwnPropertyNames(object);

      if (firstProps.length !== secondProps.length) {
        return false;
      }

      for (const i of firstProps) {
        const propName = firstProps[i];

        if (firstObject[propName] !== object[propName]) {
          return false;
        }
      }

      return true;
    };
  }

  public static isGreaterThan(getNumber: Supplier<number>, secondNumber: number): Supplier<boolean> {
    return async () => {
      const firstNumber = await getNumber();
      return firstNumber > secondNumber;
    };
  }

  public static isLessThan(getNumber: Supplier<number>, secondNumber: number): Supplier<boolean> {
    return async () => {
      const firstNumber = await getNumber();
      return firstNumber < secondNumber;
    };
  }

  public static isValueNotDefined<T>(getValue: Supplier<T>): Supplier<boolean> {
    return async () => !(await getValue());
  }

  public static isTruthy(getBoolean: BooleanSupplier): Supplier<boolean> {
    return async () => {
      return await booleanOverload(getBoolean);
    };
  }

  public static isArrayIncludesSubArray(
    getSourceArray: Supplier<Array<string>>,
    subArray: Array<string>
  ): Supplier<boolean> {
    return async (): Promise<boolean> => {
      const sourceArray = await getSourceArray();
      return subArray.every((item) => sourceArray.indexOf(item) !== -1);
    };
  }

  public static isArrayNotIncludesSubArray(
    getSourceArray: Supplier<Array<string>>,
    subArray: Array<string>
  ): Supplier<boolean> {
    return async (): Promise<boolean> => {
      const sourceArray = await getSourceArray();
      return subArray.every((item) => sourceArray.indexOf(item) === -1);
    };
  }
}
