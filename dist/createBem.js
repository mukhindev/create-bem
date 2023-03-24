const ELEMENT_DIVIDER = "__";
const MODIFIER_KEY_DIVIDER = "_";
const MODIFIER_VALUE_DIVIDER = "_";
const getClassName = (key, classes) => {
    if (!classes) {
        return key;
    }
    return classes[key];
};
export const createBem = (block, classes, options) => {
    var _a, _b, _c;
    const ed = (_a = options === null || options === void 0 ? void 0 : options.elementDivider) !== null && _a !== void 0 ? _a : ELEMENT_DIVIDER;
    const mkd = (_b = options === null || options === void 0 ? void 0 : options.modifierKeyDivider) !== null && _b !== void 0 ? _b : MODIFIER_KEY_DIVIDER;
    const mvd = (_c = options === null || options === void 0 ? void 0 : options.modifierValueDivider) !== null && _c !== void 0 ? _c : MODIFIER_VALUE_DIVIDER;
    return (element, modifier, mix) => {
        const stack = [];
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
        if (modifier !== "" &&
            (typeof modifier === "string" || typeof modifier === "number")) {
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
//# sourceMappingURL=createBem.js.map