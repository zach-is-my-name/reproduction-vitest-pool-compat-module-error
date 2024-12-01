import {  defineWorkersProject } from "@cloudflare/vitest-pool-workers/config";
import path from 'path';

export default defineWorkersProject({
	test: {
		poolOptions: {
			workers: {
				// main: "../dist/index.js",
        wrangler: { configPath: path.resolve(__dirname, '../wrangler.toml') },
			},
		},
	},
});
