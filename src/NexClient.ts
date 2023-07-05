import { Client, Collection, type ClientOptions } from 'discord.js';
import { Registry } from '#core/Registry';
import type { Command } from '#core/Command';

export class NexClient extends Client {
	public readonly registry: Registry;
	public readonly commands: Collection<string, Command>;

	public constructor(options: ClientOptions) {
		super(options);

		this.commands = new Collection();
		this.registry = new Registry(this);
	}
}