export * from './gen';

export interface Application {
	kind: string;
	metadata: {
		name: string;
	};
	spec: {
		repository: string;
		links: Array<{
			description: string;
			url: string;
		}>;
		versions: string[];
	};
}
