type BemEntities = {
  block: string;
  element: string;
};

type BemBlock<T> = T;

type BemElement<T> = T | "" | undefined | null;

type BemModifierObject = Record<
  string,
  string | number | boolean | undefined | null
>;

type BemModifierArray = (string | number | boolean | null | undefined)[];

type BemModifier =
  | string
  | number
  | BemModifierObject
  | BemModifierArray
  | ""
  | undefined
  | null;

type BemMix = string | undefined | (string | undefined)[];

type Classes = Record<string, string> | null | "";

const ELEMENT_DIVIDER = "__";
const MODIFIER_KEY_DIVIDER = "_";
const MODIFIER_VALUE_DIVIDER = "_";

interface BemClassNameCreator<T extends BemEntities> {
  (
    element?: BemElement<T["element"]>,
    modifier?: BemModifier,
    mix?: BemMix
  ): string;
}

interface BemBlockCreatorOptions {
  elementDivider?: string;
  modifierKeyDivider?: string;
  modifierValueDivider?: string;
}

interface BemBlockCreator {
  <T extends BemEntities>(
    block: BemBlock<T["block"]>,
    classes?: Classes,
    options?: BemBlockCreatorOptions
  ): BemClassNameCreator<T>;
}

const getClassName = (key: string, classes?: Classes) => {
  if (!classes) {
    return key;
  }

  return classes[key];
};

export const createBem: BemBlockCreator = (block, classes, options) => {
  const ed = options?.elementDivider ?? ELEMENT_DIVIDER;
  const mkd = options?.modifierKeyDivider ?? MODIFIER_KEY_DIVIDER;
  const mvd = options?.modifierValueDivider ?? MODIFIER_VALUE_DIVIDER;

  return (element, modifier, mix): string => {
    const stack: string[] = [];
    let root = "";

    if (!element) {
      root = block;
      stack.push(getClassName(block, classes));
    }

    if (element) {
      root = `${block}${ed}${element}`;
      stack.push(getClassName(`${block}${ed}${element}`, classes));
    }

    if (modifier && typeof modifier === "object" && !Array.isArray(modifier)) {
      Object.entries(modifier).forEach(([key, value]) => {
        if (!value && value !== 0) {
          return;
        }

        if (typeof value === "boolean") {
          stack.push(getClassName(`${root}${mkd}${key}`, classes));
          return;
        }

        stack.push(getClassName(`${root}${mkd}${key}${mvd}${value}`, classes));
      });
    }

    if (Array.isArray(modifier)) {
      modifier.forEach((value) => {
        if (!value && value !== 0) {
          return;
        }

        stack.push(getClassName(`${root}${mkd}${value}`, classes));
      });
    }

    if (
      modifier !== "" &&
      (typeof modifier === "string" || typeof modifier === "number")
    ) {
      stack.push(getClassName(`${root}${mkd}${modifier}`, classes));
    }

    if (typeof mix === "string" && mix !== "") {
      stack.push(mix);
    }

    if (Array.isArray(mix)) {
      mix.forEach((value) => {
        if (typeof value === "string") {
          stack.push(value);
        }
      });
    }

    return stack.filter((el) => el).join(" ");
  };
};
