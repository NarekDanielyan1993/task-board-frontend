const DEFAULT_VALIDATION_ERRORS = {
    required: 'Is a Required Field',
    string: 'Should be a type of text',
    empty_string: 'Is a required field',
    min_string: 'Minimum length is required',
    email: 'Invalid email address',
    pattern_password:
        'Password should include uppercase letter, lowercase letter, digit, and special character.',
};
export default DEFAULT_VALIDATION_ERRORS;
