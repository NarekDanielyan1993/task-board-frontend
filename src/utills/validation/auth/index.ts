import { z } from 'zod';
import {
    emailSchema,
    passwordSchema,
    stringMaxMinLengthSchema,
} from '../common';

export const signUpValidationSchema = z
    .object({
        name: stringMaxMinLengthSchema(20, 1),
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export const loginValidationSchema = z.object({
    password: passwordSchema,
    email: emailSchema,
});

export const resetPasswordValidationSchema = z.object({
    email: emailSchema,
});

export const updatePasswordValidationSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export type signUpValidationSchemaType = z.infer<typeof signUpValidationSchema>;
export type signInValidationSchemaType = z.infer<typeof loginValidationSchema>;
export type resetPasswordValidationSchemaType = z.infer<
    typeof resetPasswordValidationSchema
>;
export type updatePasswordValidationSchemaType = z.infer<
    typeof updatePasswordValidationSchema
>;

export type CombinePasswordReset = updatePasswordValidationSchemaType &
    resetPasswordValidationSchemaType;
