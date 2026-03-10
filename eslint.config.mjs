import globals from 'globals';
import pluginJs from '@eslint/js';
import jest from 'eslint-plugin-jest';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      // Строгость
      strict: ['error', 'global'], // Требует "use strict"
      'no-unused-vars': 'warn', // Запрещает неиспользуемые переменные
      'no-console': 'warn', // Предупреждение на console.log
      eqeqeq: 'error', // Требует === вместо ==
      curly: 'error', // Требует фигурные скобки для блоков
      'no-var': 'error', // Запрещает var
      'prefer-const': 'error', // Требует const для неизменяемых переменных

      // Форматирование
      quotes: ['error', 'single', { avoidEscape: true }], // Одинарные кавычки
      semi: ['error', 'always'], // Требует точку с запятой
      indent: ['error', 2], // Отступы в 2 пробела

      'eol-last': ['error', 'always'], // Перенос строки в конце файла
      'no-trailing-spaces': 'error', // Запрещает пробелы в конце строк
      'comma-dangle': ['error', 'never'], // Без висячих запятых
      'object-curly-spacing': ['error', 'always'], // Пробелы внутри { key: value }
      'array-bracket-spacing': ['error', 'never'], // Без пробелов в [1, 2]
      'space-before-function-paren': ['error', 'never'], // Без пробела перед ()
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }], // Не более 1 пустой строки
      'max-len': ['error', { code: 120 }] // Максимальная длина строки 120 символов
    }
  },
  {
    ignores: ['dist/*', 'coverage/*']
  },
  {
    files: ['**/*.test.js'],
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
      'jest/prefer-expect-assertions': 'off',
      'jest/expect-expect': 'error'
    }
  }
];
