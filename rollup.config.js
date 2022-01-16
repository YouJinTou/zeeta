import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript';
import postcss from 'rollup-plugin-postcss-modules';
import autoprefixer from 'autoprefixer';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import copy from "rollup-plugin-copy-assets";

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
            },
            {
                file: 'dist/index.es.js',
                format: 'es',
                exports: 'named',
            }
        ],
        plugins: [
            typescript(),
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/preset-react'],
                external: ['react', 'react-dom'],
            }),
            commonjs(),
            external(),
            resolve(),
            postcss({
                extract: true,
                plugins: [autoprefixer()],
                writeDefinitions: true,
                minimize: true,
            }),
            terser(),
            copy({
                assets: [
                    "src/assets",
                    "src/external/buffer.bin",
                ],
            }),
        ]
    }
];