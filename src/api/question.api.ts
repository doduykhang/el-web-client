import { BaseApi } from './base.api'

export class QuestionApi extends BaseApi {
	constructor() {
		super('api/question')
	}

	getOptions = async (id: number) => {
		const rs = await this.get(`/options/${id}`)
		return rs
	}

	createQuestion = async (data: any) => {
		const rs = await this.post(`/`, data)
		return rs
	}

	updateQuestion = async (data: any) => {
		const rs = await this.put(`/`, data)
		return rs
	}

	deleteQuestion = async (id: any) => {
		const rs = await this.delete(`/${id}`)
		return rs
	}
}
