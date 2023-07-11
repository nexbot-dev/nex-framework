import type { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import type { NexClient } from '../NexClient';

export class Command<T extends NexClient> {
	public readonly client: T;

	public constructor(client: T) {
		this.client = client;

		return this;
	}

	public buildAppCommand?(): SlashCommandBuilder;

	public async executeAppCommand?(interaction: CommandInteraction): Promise<unknown>;
}