export * from './gen';

export interface Application {
  kind: 'Application';
  meta: {
    name: string;
  };
  spec: {
    description: string;
    repository: string;
    links: {
      description: string;
      url: string;
    }[];
    keywords: string[];
    versions: string[];
  }
}
