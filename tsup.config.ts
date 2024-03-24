export default function defineConfig(options) {
    return {
        entry: ['src/index.ts'],
        name: 'node-moov',
        dts: true,
        platform: 'node',
        tsconfig: 'tsconfig.json',
        format: 'esm',
        skipNodeModulesBundle: true,
        sourcemap: true,
        treeshake: true,
        clean: true,
        minify: true,
    }
}
