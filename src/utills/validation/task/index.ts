import DEFAULT_VALIDATION_ERRORS from 'src/constant/error';
import { z } from 'zod';

export const searchTasksValidationSchema = z.object({
    search: z.string().min(0),
});

export type SearchTasksValidationSchemaTypes = z.infer<
    typeof searchTasksValidationSchema
>;

const addTaskValidationSchema = z.object({
    summary: z.string().min(1, { message: DEFAULT_VALIDATION_ERRORS.required }),
    attachments: z
        .array(
            z.object({
                name: z.string(),
                url: z.string(),
                isUploaded: z.boolean(),
            })
        )
        .optional(),
    removedAttachments: z
        .array(
            z.object({
                name: z.string(),
                url: z.string(),
                isUploaded: z.boolean(),
                publicId: z.string(),
            })
        )
        .optional(),
    appendAttachments: z
        .array(
            z.object({
                name: z.string(),
                url: z.string(),
                isUploaded: z.boolean(),
            })
        )
        .optional(),
    description: z.string().optional(),
    stageId: z.object({
        label: z.string(),
        value: z.string(),
    }),
    due_date: z.union([z.date(), z.literal(null)]).optional(),
    priorityId: z
        .object({
            label: z.string(),
            value: z.string(),
        })
        .nullable(),
});

export default addTaskValidationSchema;
