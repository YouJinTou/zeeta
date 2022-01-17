import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: 'dist/index.esm.js',
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: [
            external(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            postcss(),
            terser(),
        ]
    },
    {
        input: 'src/services/index.ts',
        output: [
            {
                file: 'dist/index.services.js',
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: 'dist/index.services.esm.js',
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: [
            external(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            terser(),
        ]
    },
    {
        input: 'dist/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: "esm" }],
        external: [/\.css$/],
        plugins: [dts()],
    },
    {
        input: 'dist/types/services/index.d.ts',
        output: [{ file: 'dist/index.services.d.ts', format: "esm" }],
        external: [/\.css$/],
        plugins: [dts()],
    }
]
