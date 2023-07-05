import { readdir } from 'node:fs/promises';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { getRootPath } from './getRootPath';

export type ReadDirectoryArgs = {
	directory: string;
	extFilter: string;
}

export async function readDirectory({ directory, extFilter }: ReadDirectoryArgs) {
	const root = getRootPath();
	const directoryUrl = pathToFileURL(join(root, directory));
	const directoryPath = fileURLToPath(directoryUrl);
	const directoryFiles = await readdir(directoryUrl);
	const filteredFiles = directoryFiles.filter(file => file.endsWith(`.${extFilter}`));

	return {
		directoryPath,
		filteredFiles,
	};
}