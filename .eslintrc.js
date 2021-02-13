/*
 * @Author: 黄灿民
 * @Date: 2021-02-08 10:08:23
 * @LastEditTime: 2021-02-10 21:05:51
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
