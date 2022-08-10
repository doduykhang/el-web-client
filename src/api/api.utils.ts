export const buildQueryParam = (key: any, value: any) => {
	if (value) {
		return `&${key}=${value}`
	}
	return ''
}

export const serializeQuery = (data: any) => {
	if (!data) {
		return ''
	}
	let query = ''
	Object.keys(data).map((key) => {
		query += buildQueryParam(key, data[key])
	})
	return query
}
