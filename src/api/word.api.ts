import { serializeQuery } from './api.utils'
import { BaseApi } from './base.api'

export class WordApi extends BaseApi {
	constructor() {
		super('api/word')
	}

	findWords = async (data: any) => {
		const query = serializeQuery(data)
		const rs = await this.get(`/all?${query}`)
		return rs
	}

	findWordsWithSave = async (data: any) => {
		const query = serializeQuery(data)
		const rs = await this.get(`/user/search?${query}`)
		return rs
	}
}
