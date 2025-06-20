import tailorConfig from '@tailor-cms/eslint-config';

export default [
  ...tailorConfig,
  {
    ignores: ['dist/**'],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
  },
];
