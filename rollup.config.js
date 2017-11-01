import cjs from 'rollup-plugin-commonjs';
import nodeGlobals from 'rollup-plugin-node-globals';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: './src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'iife'
    },
    plugins: [
        nodeGlobals(),
        nodeResolve({
            jsnext: true,
            main: true
        }),
        cjs(),
        typescript(),
    ]
}