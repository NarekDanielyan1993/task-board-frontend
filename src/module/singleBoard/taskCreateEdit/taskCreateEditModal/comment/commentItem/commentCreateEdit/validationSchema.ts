import z from 'zod';

export const addEditCommentValidationSchema = z.object({
    text: z.string().min(1, 'Comment is required'),
});

export type AddEditCommentFormType = z.infer<
    typeof addEditCommentValidationSchema
>;
