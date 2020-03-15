module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    'generator-star-spacing': 0,
    'space-before-function-paren': 0,
    'eol-last': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  }
}
