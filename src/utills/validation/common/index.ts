import DEFAULT_VALIDATION_ERRORS from 'src/constant/error';
import { z } from 'zod';

export const passwordSchema = z
    .string()
    .min(1, { message: DEFAULT_VALIDATION_ERRORS.required })
    .refine(
        (value: string) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                value
            ),
        { message: DEFAULT_VALIDATION_ERRORS.pattern_password }
    );

export const emailSchema = z
    .string()
    .min(1, { message: DEFAULT_VALIDATION_ERRORS.required })
    .email({ message: DEFAULT_VALIDATION_ERRORS.email });

export const stringMaxMinLengthSchema = (maxLength = 60, minLength = 0) =>
    z
        .string()
        .max(maxLength, {
            message: 'Exceeds string maximum length of characters.',
        })
        .min(minLength, { message: DEFAULT_VALIDATION_ERRORS.required });
