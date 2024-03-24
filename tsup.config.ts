export default function defineConfig(options) {
    return {
        entry: ["src", "!src/**/__tests__/**", "!src/**/*.test.*", "!src/utils/**", "!src/types/**"],
        name: 'node-moov',
        dts: true,
        platform: 'node',
        tsconfig: 'tsconfig.json',
        format: 'esm',
        skipNodeModulesBundle: true,
        sourcemap: false,
        treeshake: true,
        clean: true,
        minify: true,
    }
}
