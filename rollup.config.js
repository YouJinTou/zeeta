import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript';
import postcss from 'rollup-plugin-postcss-modules';
import autoprefixer from 'autoprefixer';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import copy from "rollup-plugin-copy-assets";
import svg from 'rollup-plugin-svg';

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
            },
            {
                file: 'dist/index.esm.js',
                format: 'esm',
                exports: 'named',
            }
        ],
        plugins: [
            external(['react', 'react-dom']),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
            }),
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/preset-react'],
                external: ['react', 'react-dom'],
            }),
            postcss({
                extract: true,
                plugins: [autoprefixer()],
                writeDefinitions: true,
                minimize: true,
            }),
            terser(),
            svg(),
            copy({
                assets: [
                    "src/assets",
                ],
            }),
        ]
    }
];