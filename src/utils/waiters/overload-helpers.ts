import { Fragment } from '@src/utils';

export type Supplier<T> = () => Promise<T>;
export type StringSupplier = string | Supplier<string>;
export type NumberSupplier = number | Supplier<number>;
export type BooleanSupplier = boolean | Supplier<boolean>;
export type FragmentTextSupplier<T extends Fragment> = string | T;

export async function stringOverload(getText: StringSupplier): Promise<string> {
  return typeof getText === 'function' ? await getText() : getText;
}

export async function fragmentTextOverload<T extends Fragment>(
  getFragmentText: FragmentTextSupplier<T>
): Promise<string> {
  return typeof getFragmentText === 'string' ? getFragmentText : await getFragmentText.getFragmentText();
}

export async function numberOverload(getNumber: NumberSupplier): Promise<number> {
  return typeof getNumber === 'function' ? await getNumber() : getNumber;
}

export async function booleanOverload(getBoolean: BooleanSupplier): Promise<boolean> {
  return typeof getBoolean === 'function' ? await getBoolean() : getBoolean;
}
