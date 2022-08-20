import { serializeQuery } from './api.utils'
import { BaseApi } from './base.api'

export class WordApi extends BaseApi {
	constructor() {
		super('api/word')
	}

	getWords = async (data: any) => {
		const query = serializeQuery(data)
		const rs = await this.get(`/all?${query}`)
		return rs
	}

	findWords = async (data: any) => {
		const query = serializeQuery(data)
		const rs = await this.get(`/maybe/all?${query}`)
		return rs
	}

	findWordsWithSave = async (data: any) => {
		const query = serializeQuery(data)
		const rs = await this.get(`/user/search?${query}`)
		return rs
	}

	addWordToUser = async (data: any) => {
		const rs = await this.post(`/user`, data)
		return rs
	}

	removeWordFromUser = async (data: any) => {
		const rs = await this.delete(`/user`, data)
		return rs
	}

	getWordOfUser = async () => {
		const rs = await this.get(`/user`)
		return rs
	}

	createWord = async (data: any) => {
		const rs = await this.post(`/`, data)
		return rs
	}

	updateWord = async (data: any) => {
		const rs = await this.put(`/`, data)
		return rs
	}

	deleteWord = async (id: number) => {
		const rs = await this.delete(`/${id}`)
		return rs
	}
}
