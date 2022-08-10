import { serializeQuery } from './api.utils'
import { BaseApi } from './base.api'

export class LessonApi extends BaseApi {
	constructor() {
		super('api/lesson')
	}

	getLessons = async (data: any) => {
		const query = serializeQuery(data)
		const rs = await this.get(`/all?${query}`)
		return rs
	}

	getLessonDetail = async (id: number) => {
		const rs = await this.get(`/${id}`)
		return rs
	}
}
