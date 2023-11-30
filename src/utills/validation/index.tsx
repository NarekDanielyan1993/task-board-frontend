import zod from 'zod';

const searchValidationSchema = zod.object({
    search: zod.string(),
});

export default searchValidationSchema;
