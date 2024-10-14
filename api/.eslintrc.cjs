module.exports = {
    root: true,
    env: {
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    ignorePatterns: ['dist', '.eslintrc.json'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'no-undef': 'error',
        'no-unused-vars': 'warn',
    },
};
