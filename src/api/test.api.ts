import { BaseApi } from './base.api'

export class TestApi extends BaseApi {
	constructor() {
		super('api/test')
	}

	getQuestions = async (id: number) => {
		const rs = await this.get(`/questions/${id}`)
		return rs
	}

	submitTest = async (data: any) => {
		const rs = await this.post(`/user/submit-test`, data)
		return rs
	}
}
