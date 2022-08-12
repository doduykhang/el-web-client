import { BaseApi } from './base.api'

export class TestApi extends BaseApi {
	constructor() {
		super('api/test')
	}

	getQuestions = async (id: number) => {
		const rs = await this.get(`/questions/${id}`)
		return rs
	}
}
