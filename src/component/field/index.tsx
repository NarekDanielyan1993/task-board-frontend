import { Controller, FieldValues } from 'react-hook-form';
import { IFormInputProps } from 'src/types';
import ColorPicker from './colorPicker';
import DatePicker from './datePicker';
import FileSelect from './fileSelect';
import NumberField from './numberField';
import PasswordField from './passwordField';
import { StyledErrorText, StyledInput, StyledSelect } from './style';
import TextField from './textField';

function FormInput<T extends FieldValues>({
    control,
    name,
    label,
    type = 'text',
    error,
    options,
    rows,
    size = 'md',
    dateFormat,
    disabled,
    defaultValue,
    isClearable = false,
}: IFormInputProps<T>) {
    switch (type) {
        // case 'switch':
        //     return (
        //         <Controller
        //             control={control}
        //             name={name}
        //             render={({ field: { value, onChange } }) => (
        //                 <Switch
        //                     isChecked={value}
        //                     {...defaultOptions}
        //                     onChange={onChange}
        //                 />
        //             )}
        //         />
        //     );
        case 'select':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                        <StyledSelect
                            isClearable={isClearable}
                            isSearchable={false}
                            mb={2}
                            onChange={onChange}
                            options={options}
                            value={value}
                        />
                    )}
                />
            );
        // case 'multiple-select':
        //     return (
        //         <Controller
        //             control={control}
        //             defaultValue={defaultValue}
        //             name={name}
        //             render={({ field: { onChange, value } }) => (
        //                 <StyledSelect
        //                     isMulti
        //                     onChange={val =>
        //                         onChange(val as ChangeEvent<HTMLInputElement>)
        //                     }
        //                     options={options}
        //                     value={value}
        //                 />
        //             )}
        //         />
        //     );
        case 'custom-date':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => {
                        return (
                            <DatePicker
                                dateFormat={dateFormat}
                                label={label}
                                onChange={onChange}
                                value={value}
                            />
                        );
                    }}
                />
            );
        case 'file':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange } }) => (
                        <FileSelect
                            name={name}
                            onChange={onChange}
                            // value={value}
                        />
                    )}
                />
            );
        case 'textarea':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                        <StyledInput
                            as="textarea"
                            mb={2}
                            name={name}
                            onChange={onChange}
                            placeholder={label}
                            resize="none"
                            rows={rows || 6}
                            value={value}
                        />
                    )}
                />
            );
        // case 'checkbox':
        //     return (
        //         <Controller
        //             control={control}
        //             name={name}
        //             render={({ field: { value, onChange } }) => (
        //                 <Checkbox
        //                     isChecked={value}
        //                     onChange={onChange}
        //                     {...defaultOptions}
        //                 >
        //                     {label}
        //                 </Checkbox>
        //             )}
        //         />
        //     );
        case 'password': {
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <PasswordField
                            error={error}
                            label={label}
                            name={name}
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
            );
        }
        case 'color-picker': {
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <ColorPicker
                            label={label || ''}
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
            );
        }
        case 'number': {
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <NumberField onChange={onChange} value={value} />
                            <StyledErrorText>{error && error}</StyledErrorText>
                        </>
                    )}
                />
            );
        }
        default:
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            disabled={disabled}
                            error={error}
                            label={label}
                            name={name}
                            onChange={onChange}
                            size={size}
                            value={value}
                        />
                    )}
                />
            );
    }
}

export default FormInput;
