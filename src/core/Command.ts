import type { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import type { NexClient } from '../NexClient';

export class Command {
	public readonly client: NexClient;

	public constructor(client: NexClient) {
		this.client = client;

		return this;
	}

	public buildAppCommand?(): SlashCommandBuilder;

	public async executeAppCommand?(interaction: CommandInteraction): Promise<unknown>;
}