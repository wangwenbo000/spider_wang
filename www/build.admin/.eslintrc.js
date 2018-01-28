// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  globals:{
    $:true,
    UE:true
  },
  // required to lint *.vue files
  plugins: [
    'html',
    'vue'
  ],
  extends:'vue',
  settings: {
    'html/html-extensions': ['.html', '.vue']
  },
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
