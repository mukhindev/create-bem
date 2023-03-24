# Create BEM

Utility for creating [BEM](https://bem.info/) class names. CSS Modules support.

## BEM

<u>B</u>lock, <u>E</u>lement, <u>M</u>odifier

Elements is a child of Block.
Modifiers refer of to Block or Element.

`block-name`  
`__element-name`  
`_modifier-name` or `_modifier-key` `_modifier-value`  
`mix-name`

```html
<label class="input">
  <span class="input__label"></span>
  <input class="input__field input__field_disabled input__field_size_large" />
</label>
```

## CSS

```ts
import { createBem } from "@mukhindev/create-bem";

// BEM-block (function)
const bem = createBem("input");
```

bem(`element`, `modifier(s)`, `mix(es)`) return class names in BEM-style:

```ts
bem(); // input
bem("label"); // input__label
bem("label", "active"); // input__label input__label_active
bem("label", ["active", "large"]); // input__label input__label_active input__label_large
bem("label", { color: "red", large: false, active: true }); // input__label input__label_color_red input__label_active
bem("", { color: "red", large: false, active: true }); // input input_color_red input_active
bem("", "", "main-page"); // input main-page
bem("label", { color: "red" }, "main-page"); // input__label input__label_color_red main-page
```

## CSS Modules

The second argument to `createBem` is the object created by the CSS module:

```ts
import { createBem } from "@mukhindev/create-bem";
import classes from "./style.module.css";

const bem = createBem("input", classes);

bem("label", "active"); // _input__label_{hash} _input__label_active_{hash}
```

If the css selector is undefined or empty, CSS modules ignore class generation. Utility `createBem` also ignores this selector:

```ts
bem("message", "", "mix"); // "mix"
```

If you find problems, check how your CSS selectors are hashed.
Hashed names should be converted like this:

```
input -> _input_{hash}
input__label -> _input__label_{hash}
```

## Options

Often the modifier is separated by `--`. The third argument to `createBem` is options:

```ts
const bem = createBem("input", undefined, { modifierKeyDivider: "--" });
```

Default options:

```ts
                             ↓
elementDivider: "__" // input__field_size_large
                                        ↓                          ↓
modifierKeyDivider: "_" //  input__field_size_large or input__field_active
                                              ↓
modifierValueDivider: "_" // input__field_size_large
```
