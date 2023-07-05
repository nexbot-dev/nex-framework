import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

let rootPath: string | null = null;

export function getRootPath() {
	if (rootPath !== null) return rootPath;

	const cwd = process.cwd();

	try {
		const pkgJson = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8'));
		rootPath = dirname(join(cwd, pkgJson.main));
	} catch {
		rootPath = cwd;
	}

	return rootPath;
}