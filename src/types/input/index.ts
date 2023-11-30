import type { fieldSizesTypesUnion } from '..';

export interface ITextField {
    name: string;
    onChange: () => void;
    value: string | number;
    label?: string | undefined;
    error: string | undefined;
    disabled?: boolean | undefined;
    size?: fieldSizesTypesUnion;
}
