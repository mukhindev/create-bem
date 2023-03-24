type BemEntities = {
    block: string;
    element: string;
};
type BemBlock<T> = T;
type BemElement<T> = T | "" | undefined | null;
type BemModifierObject = Record<string, string | number | boolean | undefined | null>;
type BemModifierArray = (string | number | boolean | null | undefined)[];
type BemModifier = string | number | BemModifierObject | BemModifierArray | "" | undefined | null;
type BemMix = string | undefined | (string | undefined)[];
type Classes = Record<string, string> | null | "";
interface BemClassNameCreator<T extends BemEntities> {
    (element?: BemElement<T["element"]>, modifier?: BemModifier, mix?: BemMix): string;
}
interface BemBlockCreatorOptions {
    elementDivider?: string;
    modifierKeyDivider?: string;
    modifierValueDivider?: string;
}
interface BemBlockCreator {
    <T extends BemEntities>(block: BemBlock<T["block"]>, classes?: Classes, options?: BemBlockCreatorOptions): BemClassNameCreator<T>;
}
export declare const createBem: BemBlockCreator;
export {};
