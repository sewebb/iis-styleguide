import fs from 'node:fs';
import { defineConfig } from 'vite';

let exitHandlersBound = false;
let basePath = '/';

const internetstiftelsen = (config = {}) => [
	{
		name: 'internetstiftelsen',
		enforce: 'post',
		config: (c, { command }) => {
			basePath = command === 'build' ? `/public/assets/` : '';

			return {
				publicDir: `public/assets`,
				base: basePath,
				server: {
					port: process.env.VITE_PORT || 5173,
				},
				css: {
					lightningcss: {
						minify: true,
					},
					preprocessorOptions: {
						scss: {
							api: 'modern-compiler',
						},
					},
				},
				esbuild: {
					minifyIdentifiers: false,
					drop: ['console', 'debugger'],
				},
				build: {
					assetsDir: '',
					emptyOutDir: true,
					manifest: true,
					copyPublicDir: false,
					outDir: `public/assets`,
					cssMinify: 'lightningcss',
					rollupOptions: {
						input: config.input,
					},
				},
			};
		},
		configureServer(server) {
			const hotFile = `public/hot`;

			server.httpServer.once('listening', () => {
				const address = server.httpServer?.address();

				fs.writeFileSync(
					hotFile,
					`http://localhost:${address.port || process.env.VITE_PORT || 5173}${basePath}`,
				);
			});

			if (!exitHandlersBound) {
				const clean = () => {
					if (fs.existsSync(hotFile)) {
						fs.rmSync(hotFile);
					}
				};

				process.on('exit', clean);
				process.on('SIGINT', () => process.exit());
				process.on('SIGTERM', () => process.exit());
				process.on('SIGHUP', () => process.exit());

				exitHandlersBound = true;
			}
		},
	},
];

export default defineConfig({
	plugins: [
		internetstiftelsen({
			input: ['/src/app.js', '/src/app.scss'],
		}),
	],
});
