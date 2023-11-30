const getEnv = (environmentVariable: string): string => {
    const unvalidatedEnvironmentVariable = process.env[environmentVariable];
    if (!unvalidatedEnvironmentVariable) {
        console.log(
            `Couldn't find environment variable: ${environmentVariable}`
        );
        return '';
    }
    return unvalidatedEnvironmentVariable;
};

const config = {
    isDev: process.env.NODE_ENV === 'development',
    // CLIENT_BASE_URL: getEnv('CLIENT_BASE_URL'),
    // SERVER_BASE_URL: getEnv('SERVER_BASE_URL'),
};

export default config;
