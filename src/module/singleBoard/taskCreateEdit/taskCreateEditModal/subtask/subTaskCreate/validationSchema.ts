import z from 'zod';

export const addSubtaskValidationSchema = z.object({
    summary: z.string().min(1).max(50),
});

export type addSubtaskFormType = z.infer<typeof addSubtaskValidationSchema>;
