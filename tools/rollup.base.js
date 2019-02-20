import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';

export default [
    {
        input: 'src/mp/index.ts',
        output: {
            name: 'service',
            file: 'dist/tcb-service-mp-sdk/index.js',
            format: 'esm'
        },
        plugins: [
            resolve(), // so Rollup can find `ms`
            typescript()
            // commonjs(), // so Rollup can convert `ms` to an ES module
        ]
    },
    {
        input: 'src/node/index.ts',
        output: {
            name: 'service',
            file: 'dist/tcb-service-node-sdk/index.js',
            format: 'cjs'
        },
        plugins: [
            resolve(),
            typescript()
        ]
    },
];
