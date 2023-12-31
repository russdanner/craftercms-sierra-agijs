const typescript = require('rollup-plugin-typescript2');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const replaceImportsWithVars = require('rollup-plugin-replace-imports-with-vars');
const json = require('@rollup/plugin-json');
const pkg = require('./package.json');
const copy = require('rollup-plugin-copy');
// const { terser } = require('rollup-plugin-terser');
const replace = require('@rollup/plugin-replace');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const globals = {
  react: 'craftercms.libs.React',
  rxjs: 'craftercms.libs.rxjs',
  'rxjs/operators': 'craftercms.libs.rxjs',
  '@emotion/css/create-instance': 'craftercms.libs.createEmotion',
  'react-dom': 'craftercms.libs.ReactDOM',
  'react-intl': 'craftercms.libs.ReactIntl',
  'react-redux': 'craftercms.libs.ReactRedux',
  '@mui/material': 'craftercms.libs.MaterialUI',
  '@craftercms/studio-ui': 'craftercms.components',
  '@craftercms/studio-ui/components': 'craftercms.components',
  '@mui/material/utils': 'craftercms.libs.MaterialUI',
  '@reduxjs/toolkit': 'craftercms.libs.ReduxToolkit'
};

const replacementRegExps = {
  '@craftercms/studio-ui/(components|icons|utils|services)/(.+)': (exec) =>
    `craftercms.${exec[1]}.${exec[2].split('/').pop()}`,
  '@mui/material/styles': (exec) => 'craftercms.libs.MaterialUI',
  '@mui/material/(.+)': (exec) => `craftercms.libs.MaterialUI.${exec[1]}`,
  '@mui/icons-material/(.+(Rounded|Outlined))$': (exec) => `craftercms.utils.constants.components.get('${exec[0]}')`
};

module.exports = {
  context: 'this',
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'es',
      globals
    }
  ],
  external: Object.keys(globals).concat(Object.keys(replacementRegExps).map((str) => new RegExp(str))),
  plugins: [
    json(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    typescript({
      tsconfigOverride: { compilerOptions: { declaration: false } }
    }),
    replaceImportsWithVars({
      replacementLookup: globals,
      replacementRegExps
    }),
    // !!: If used, terser should be after `replaceImportsWithVars`
    //terser(),
    resolve({ extensions }),
    commonjs(),
    copy({
      hook: 'closeBundle',
      targets: [
        // {
        //   src: './dist/*',
        //   dest: '/path/to/where/you/want/to/copy'
        // },
        {
          src: './dist/*',
          dest: '../../../authoring/static-assets/plugins/org/rd/plugin/agistudio/apps/agistudio'
        }
      ]
    })
  ]
};
