import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm as UseReactHookForm } from 'react-hook-form';
import FormInput from 'src/component/field';
import { IFormFieldProps, IFormProps } from 'src/types/form';

const useForm = <T extends FieldValues>({
    validationSchema,
    defaultValues,
}: IFormProps<T>) => {
    // const customResolver = (values, _context, dat) => {
    //     if (dat.names.length === 1) {
    //         const errors = dat.names.reduce((result, name) => {
    //             const value = values[name];
    //             const validationResult = validationSchema?.safeParse({
    //                 [name]: value,
    //             });
    //             if (!validationResult?.success) {
    //                 const message = validationResult?.error.issues[0].message;
    //                 const type = validationResult?.error.issues[0].code;
    //                 return {
    //                     ...result,
    //                     [name]: {
    //                         message,
    //                         type,
    //                         ref: { name },
    //                     },
    //                 };
    //             }
    //             return result;
    //         }, {});
    //         if (!isObjectEmpty(errors)) {
    //             return { errors, values };
    //         }
    //     } else {
    //         const errorMessages = {};
    //         const validationResult = validationSchema?.safeParse(values);
    //         if (!validationResult?.success) {
    //             validationResult?.error?.issues.forEach((issue) => {
    //                 errorMessages[issue.path[0]] = {
    //                     message: issue.message,
    //                     type: issue.code,
    //                     ref: {
    //                         name: issue.path[0],
    //                     },
    //                 };
    //             });
    //         }
    //         if (!isObjectEmpty(errorMessages)) {
    //             return { errors: errorMessages, values };
    //         }

    //         const dirtyData: Partial<T> = Object.entries(dat.fields).reduce(
    //             (acc, [key, { value }]) => {
    //                 if (!deepEqual(value, defaultValues[key])) {
    //                     acc[key] = value;
    //                 }
    //                 return acc;
    //             },
    //             {}
    //         );

    //         console.log(dirtyData);
    //         if (!isObjectEmpty(dirtyData)) {
    //             return { values: dirtyData, errors: {} };
    //         }
    //     }
    //     return { values, errors: {} };
    // };

    const {
        register,
        watch,
        setValue,
        handleSubmit,
        control,
        reset,
        formState,
        clearErrors,
    } = UseReactHookForm<T>({
        mode: 'onChange',
        shouldUnregister: true,
        reValidateMode: 'onChange',
        ...(validationSchema && {
            resolver: zodResolver(validationSchema),
        }),
        defaultValues,
    });

    console.log('formState.errors', formState.errors);
    function FormField({
        name,
        label = '',
        type = 'text',
        views,
        dateFormat,
        rows = 6,
        disabled = false,
        options = [],
        size = 'md',
        defaultValue = '',
        isClearable = false,
    }: IFormFieldProps<T>) {
        return (
            <FormInput
                control={control}
                defaultValue={defaultValue}
                disabled={disabled}
                error={formState.errors[name]?.message as string}
                isClearable={isClearable}
                label={label}
                name={name}
                options={options}
                rows={rows}
                size={size}
                type={type}
                {...(dateFormat && { dateFormat })}
                {...(views && { views })}
            />
        );
    }

    return {
        register,
        setValue,
        watch,
        handleSubmit,
        FormField,
        reset,
        control,
        formState,
        clearErrors,
    };
};

export default useForm;
