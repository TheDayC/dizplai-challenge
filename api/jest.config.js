// eslint-disable-next-line no-undef
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/setup.ts'], // Optional for setup after environment
    testPathIgnorePatterns: ['/node_modules/', '/prisma/'], // Exclude directories
};
