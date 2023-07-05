import type { NexClient } from '../NexClient';
import type { Event } from './Event';
import type { Command } from './Command';
import { readDirectory } from '#libs/readDirectory';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

export class Registry {
	private readonly client: NexClient;

	public constructor(client: NexClient) {
		this.client = client;

		return this;
	}

	private async registerEvent(fileName: string, directoryPath: string) {
		const filePath = this.createImportUrl(directoryPath, fileName).href;
		const { AppEvent } = await import(filePath);
		const event: Event = new AppEvent(this.client);

		if (event.metadata.once) {
			this.client.once(event.metadata.name, (...args) => event.execute?.(...args));
		}
		else {
			this.client.on(event.metadata.name, (...args) => event.execute?.(...args));
		}
	}

	public async registerEvents(eventDirectory: string) {
		const { directoryPath, filteredFiles } = await readDirectory({
			directory: eventDirectory,
			extFilter: 'js',
		});

		for (const file of filteredFiles) {
			await this.registerEvent(file, directoryPath);
		}

		return this;
	}

	private async registerCommand(fileName: string, directoryPath: string) {
		const filePath = this.createImportUrl(directoryPath, fileName).href;
		const { AppCommand } = await import(filePath);
		const command: Command = new AppCommand(this.client);

		if (command.buildAppCommand?.() === undefined) {
			return;
		}

		this.client.commands.set(command.buildAppCommand().name, command);
	}
	
	public async registerCommands(commandDirectory: string) {
		const { directoryPath, filteredFiles } = await readDirectory({
			directory: commandDirectory,
			extFilter: 'js',
		});

		for (const file of filteredFiles) {
			await this.registerCommand(file, directoryPath);
		}

		return this;
	}

	private createImportUrl(directory: string, file: string) {
		return pathToFileURL(join(directory, file));
	}
}