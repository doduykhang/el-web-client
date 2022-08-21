import { BaseApi } from './base.api'

export class OptionApi extends BaseApi {
	constructor() {
		super('api/option')
	}

	createOption = async (data: any) => {
		const rs = await this.post(`/`, data)
		return rs
	}

	updateOption = async (data: any) => {
		const rs = await this.put(`/`, data)
		return rs
	}

	deleteOption = async (id: any) => {
		const rs = await this.delete(`/${id}`)
		return rs
	}
}
