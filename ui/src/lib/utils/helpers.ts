export const stringToSnakeCase = (name: string) => name.split(' ').join('-').toLocaleLowerCase();

// Truncates a string to a maximum length, adding ellipses if necessary, and ensuring "words" are not cut off
export const truncateString = (str: string, maxLength: number) => {
	const ellipses = '...';
	if (str.length > maxLength) {
		const truncated = str.slice(0, maxLength);
		const lastSpaceIndex = truncated.lastIndexOf(' ');
		if (lastSpaceIndex > 0) {
			return truncated.slice(0, lastSpaceIndex).trimEnd() + ellipses;
		} else {
			return truncated.trimEnd() + ellipses;
		}
	}
	return str;
};
