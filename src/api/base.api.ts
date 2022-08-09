import axios from 'axios'

const serializeForm = (data: any) => {
	let rs = ''
	for (const k in data) {
		rs += `${k}=${encodeURIComponent(data[k])}&`
	}
	return rs.substr(0, rs.length - 1) // remove '&' at the end
}

export const CONTENT_TYPE = {
	MULTIPART_FORM_DATA: 'multipart/form-data',
	FORM_URLENCODED: 'application/x-www-form-urlencoded',
}

export const METHOD_AXIOS = {
	GET: 'get',
	POST: 'post',
	PUT: 'put',
	DELETE: 'delete',
}

const API_URL = 'http://localhost:3000'

export class BaseApi {
	private URL: string

	constructor(pathUrl: string) {
		this.URL = `${API_URL}/${pathUrl}`
	}
	protected abstract = async (
		path: string,
		data: any,
		method = METHOD_AXIOS.GET
	) => {
		const config = {
			method,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			url: `${this.URL}${path}`,
			data,
			withCredentials: true,
		}

		return axios(config)
			.then(function (response) {
				return response ? response.data : response
			})
			.catch(function (err) {
				throw new Error(err.response.data.trim())
			})
	}

	protected methodWithFormData = async (
		path: string,
		data: any,
		method = METHOD_AXIOS.GET,
		contentType = CONTENT_TYPE.MULTIPART_FORM_DATA
	) => {
		var bodyFormData = new FormData()
		Object.keys(data).map((item) => {
			bodyFormData.append(item, data[item])
			return null
		})
		const config = {
			method,
			url: `${this.URL}${path}`,
			data: bodyFormData,
			headers: {
				'Content-Type': contentType,
			},
			withCredentials: true,
		}

		return axios(config)
			.then(function (response) {
				return response ? response.data : response
			})
			.catch(function (err) {
				throw new Error(err.response.data.trim())
			})
	}

	protected methodWithFormDataWithoutBasePath = async (
		path: string,
		data: any,
		method = METHOD_AXIOS.GET,
		contentType = CONTENT_TYPE.MULTIPART_FORM_DATA
	) => {
		var bodyFormData = new FormData()
		Object.keys(data).map((item) => {
			bodyFormData.append(item, data[item])
			return null
		})
		const config = {
			method,
			url: `${path}`,
			data: bodyFormData,
			headers: {
				'Content-Type': contentType,
			},
			withCredentials: true,
		}

		return axios(config)
			.then(function (response) {
				return response ? response.data : response
			})
			.catch(function (err) {
				throw new Error(err.response.data.trim())
			})
	}

	protected methodWithFormDataUrlEncoded = async (
		path: string,
		data: any,
		method = METHOD_AXIOS.GET,
		contentType = CONTENT_TYPE.FORM_URLENCODED
	) => {
		var bodyFormData = serializeForm(data)
		const config = {
			method,
			url: `${this.URL}${path}`,
			data: bodyFormData,
			headers: {
				'Content-Type': contentType,
			},
			withCredentials: true,
		}

		return axios(config)
			.then(function (response) {
				return response ? response.data : response
			})
			.catch(function (err) {
				throw new Error(err.response.data.trim())
			})
	}

	protected get = async (path: string, data?: any) =>
		await this.abstract(path, data, METHOD_AXIOS.GET)
	protected post = async (path: string, data?: any) =>
		await this.abstract(path, data, METHOD_AXIOS.POST)
	protected put = async (path: string, data?: any) =>
		await this.abstract(path, data, METHOD_AXIOS.PUT)
	protected delete = async (path: string, data?: any) =>
		await this.abstract(path, data, METHOD_AXIOS.DELETE)
}
