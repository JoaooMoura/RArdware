module.exports = {
  root: true,
  extends: [
    '@react-native', // base: typescript + react + react-native rules
    'plugin:prettier/recommended', // must be last: overrides formatting rules
  ],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
  },
};
