import minify from 'rollup-plugin-babel-minify';
import cjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import nodeGlobals from 'rollup-plugin-node-globals';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

function createConfig(folder) {
    return {
        input: `./${folder}/index.ts`,
        output: {
            file: `dist/${folder}/index.js`,
            format: 'iife',
            sourcemap: true,
        },
        plugins: [
            nodeGlobals(),
            nodeResolve({
                jsnext: true,
                main: true
            }),
            cjs(),
            typescript(),
            copy({
                [`${folder}/index.html`]: `dist/${folder}/index.html`,
                'node_modules/@webcomponents': 'dist/node_modules/@webcomponents'
            }),
            minify({ comments: false })
        ]
    };
}

export default [
    'todo',
    'unit-converter'
].map(createConfig);