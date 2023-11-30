import { Control, DefaultValues, FieldValues, Path } from 'react-hook-form';
import { ZodSchema } from 'zod';

export type FieldTypes = {
    name: string;
    label: string;
    format?: string;
    views: string[];
    type: string;
};

export type FormErrorTypes = {
    message: string;
    type: string;
};

export interface IFormProps<T> {
    validationSchema?: ZodSchema;
    defaultValues: DefaultValues<T>;
}

export type fieldSizesTypesUnion = 'sm' | 'md' | 'lg' | 'xl';

type SelectProps = {
    value: string;
    label: string;
};

export type IFormFieldProps<T> = {
    views?: string[];
    isClearable?: boolean;
    disabled?: boolean;
    dateFormat?: string;
    label?: string;
    rows?: number;
    type?: string;
    name: Path<T>;
    options?: SelectProps[];
    defaultValue?: string;
    size?: fieldSizesTypesUnion;
};

export type IFormInputProps<T extends FieldValues> = {
    error: string;
    control: Control<T>;
    isInvalid?: boolean;
} & IFormFieldProps<T>;

export type IFormFieldSearchProps<T> = {
    disabled?: boolean;
    label?: string;
    name: Path<T>;
    fn: (data: T) => void;
    size?: fieldSizesTypesUnion;
};

export interface ChakraFieldDefaultOptions<T> extends IFormFieldProps<T> {
    isInvalid?: boolean;
}
