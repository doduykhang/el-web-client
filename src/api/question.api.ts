import { BaseApi } from './base.api'

export class QuestionApi extends BaseApi {
	constructor() {
		super('api/question')
	}

	getOptions = async (id: number) => {
		const rs = await this.get(`/options/${id}`)
		return rs
	}
}
