import { describe, expect, test } from 'vitest';
import { readDirectory } from '#libs/readDirectory';
import { pathToFileURL } from 'node:url';

const mockDir = await readDirectory({
	directory: '../tests/mock',
	extFilter: 'js',
});
const mockUrl = new URL('../../tests/mock', import.meta.url);
const mockFile = 'testfile.js';

describe('read directory test', async () => {
	test('should get directory href path', () => {
		expect(pathToFileURL(mockDir.directoryPath).href).toBe(mockUrl.href);
	});

	test('should get file name', () => {
		expect(mockDir.filteredFiles.find(file => file === mockFile)).toBe(mockFile);
	});
});