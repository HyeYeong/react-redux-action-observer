import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

const pkg = require('./package.json');

const config = {
  input: 'src/react-redux-action-observer/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: false,
      tsconfig: 'tsconfig.module.json',
    }),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    uglify(),
  ],
};

export default config;
