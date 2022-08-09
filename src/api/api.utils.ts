export const buildQueryParam = (key, value) => {
	if (value) {
		return `&${key}=${value}`
	}
	return ''
}
