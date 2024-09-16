// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-present The UDS Authors
import { describe, expect, it } from 'vitest';
import { truncateString } from './helpers';

describe('AppCard', () => {
	const description =
		'GitLab Runner is a powerful, open-source automation tool that executes jobs\nin your CI/CD pipelines. It works seamlessly with GitLab, allowing you to build,\ntest, and deploy your code efficiently. GitLab Runner supports multiple programming\nlanguages, can run on various operating systems, and offers flexible deployment\noptions including Docker containers and Kubernetes clusters. With its scalable\narchitecture and robust feature set, GitLab Runner helps development teams\nstreamline their workflows and deliver high-quality software faster.\n';

	const truncatedExpected =
		'GitLab Runner is a powerful, open-source automation tool that executes jobs in your CI/CD pipelines. It works seamlessly with GitLab, allowing you...';

	it('truncates the text', () => {
		const truncated = truncateString(description, 150);
		expect(truncated.length).toBeLessThanOrEqual(150);
		expect(truncatedExpected.length).toBeLessThanOrEqual(150);
		expect(truncated).toBe(truncatedExpected);
	});
});
