import type { NexClient } from '../NexClient';

export interface EventOptions {
	readonly name: string;
	readonly once?: boolean;
}

export class Event {
	public readonly client: NexClient;
	public readonly metadata: EventOptions;

	public constructor(client: NexClient, { name, once }: EventOptions) {
		this.client = client;
		this.metadata = {
			name: name,
			once: once,
		};

		return this;
	}

	public execute?(...args: any[]): void;
}