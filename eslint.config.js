import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  rules: {
    'no-console': [
      'error',
      {
        allow: [
          'info',
          'warn',
          'trace',
          'error',
        ],
      },
    ],
  },
})
