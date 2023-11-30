import DEFAULT_VALIDATION_ERRORS from 'src/constant/error';
import { z } from 'zod';

export const addStageValidationSchema = z.object({
    name: z.string().min(1, { message: DEFAULT_VALIDATION_ERRORS.required }),
    color: z.string().min(1, { message: DEFAULT_VALIDATION_ERRORS.required }),
    listPosition: z
        .string()
        .refine((value) => !Number.isNaN(Number(value)), 'Input number')
        .refine((value) => Number(value) > 0, 'Input positive number')
        .transform((value) => Number(value)),
});

export type AddStageValidationType = z.infer<typeof addStageValidationSchema>;
