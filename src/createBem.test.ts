import { createBem } from "./createBem.js";
import { describe, it, expect } from "vitest";

// CSS Modules (default Vite config)
const classes = {
  input: "_input_hash",
  input__label: "_input__label_hash",
};

const bem = createBem("input");
const bemWithClasses = createBem("input", classes);

const bemWithOptions = createBem("input", null, {
  modifierKeyDivider: "--",
  modifierValueDivider: "_",
});

/* eslint-disable */
const cases = [
  {
    result: bem(),
    expected: "input",
  },
  {
    result: bem(""),
    expected: "input",
  },
  {
    result: bem("", ""),
    expected: "input",
  },
  {
    result: bem("", "", ""),
    expected: "input",
  },
  {
    result: bem("", "", "mix"),
    expected: "input mix",
  },
  {
    // @ts-ignore
    result: bem("", "", ["mix1", "mix2", "", false, true]),
    expected: "input mix1 mix2",
  },
  {
    result: bem("label"),
    expected: "input__label",
  },
  {
    result: bem("label", "", "mix"),
    expected: "input__label mix",
  },
  {
    result: bem("label", "active"),
    expected: "input__label input__label_active",
  },
  {
    result: bem("label", 0),
    expected: "input__label input__label_0",
  },
  {
    result: bem("label", { left: "0", top: 0 }),
    expected: "input__label input__label_left_0 input__label_top_0",
  },
  {
    result: bem("", ["error", null, true, "active", undefined, "mobile", 42]),
    expected: "input input_error input_true input_active input_mobile input_42",
  },
  {
    result: bemWithClasses(),
    expected: "_input_hash",
  },
  {
    result: bemWithClasses("label"),
    expected: "_input__label_hash",
  },
  {
    // CSS Modules don't create classNames for empty CSS
    result: bemWithClasses("field"),
    expected: "",
  },
  {
    // CSS Modules don't create classNames for empty CSS
    result: bemWithClasses("field", "", "mix"),
    expected: "mix",
  },
  {
    result: bemWithOptions("label", { active: true, color: "secondary" }),
    expected: "input__label input__label--active input__label--color_secondary",
  },
].map((el) => {
  return {
    ...el,
    toString() {
      return this.result.toString();
    },
  };
});
/* eslint-enable */

describe("CreateBemUtil test", () => {
  it.each(cases)("%s", ({ result, expected }) => {
    expect(result).toBe(expected);
  });
});
