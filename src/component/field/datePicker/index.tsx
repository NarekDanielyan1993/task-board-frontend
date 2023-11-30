import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { dd_MM_YYYY } from 'src/constant/date';
import useToggle from 'src/hooks/useToggle';
import { StyledDatePicker, StyledInput } from '../style';

// const DateInputComponent = forwardRef(({ value, autoFocus, onClick }, ref) => {
//     return <StyledInput onClick={onClick} ref={ref} value={value} />;
// });

function DatePicker({
    onChange,
    dateFormat,
    value,
    label,
}: {
    onChange: () => void;
    dateFormat?: string | undefined;
    value: Date | null | undefined;
    label: string | undefined;
}) {
    const { value: isOpen, toggle } = useToggle(false);
    // const datePickerRef = useRef(null);

    // const onCalendarClose = () => {
    //     toggle();
    //     console.log(datePickerRef.current);
    //     datePickerRef.current.setBlur();
    // };

    return (
        <StyledDatePicker>
            <ReactDatePicker
                ariaLabelledBy={label}
                autoFocus={isOpen}
                closeOnScroll
                customInput={<StyledInput />}
                dateFormat={dateFormat || dd_MM_YYYY}
                isClearable
                onChange={onChange}
                onClickOutside={() => toggle()}
                onInputClick={() => toggle()}
                onSelect={() => toggle()}
                open={isOpen}
                readOnly
                selected={value}
            />
        </StyledDatePicker>
    );
}

export default DatePicker;
