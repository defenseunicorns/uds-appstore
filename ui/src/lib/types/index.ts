export * from './gen';

export interface Application {
	kind: 'Application';
	metadata: {
		name: string;
	};
	spec: {
		title: string;
		description: string;
		repository: string;
		icons: Icon[];
		vendor: {
			name: string;
			url: string;
			icons: Icon[];
		};
		contractingDetails: {
			number: string;
			vehicle: string[];
			pricing: 'Free' | 'Bring Your Own License';
			smallBusinessStatus: string;
		};
		security: {
			nist800_53: boolean;
			fips: boolean;
			cveReport: boolean;
			sbom: boolean;
		};
		architecture: string[];
		providers: string[];
		keywords: string[];
		links: ResourceLink[];
		versions: string[];
	};
}

export interface Icon {
	src: string;
	type: string;
	size: string;
}

export interface ResourceLink {
	description: string;
	url: string;
}
