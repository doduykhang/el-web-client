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

	getWords = async (id: number) => {
		const rs = await this.get(`/get-words/${id}`)
		return rs
	}

	getLessonDetail = async (id: number) => {
		const rs = await this.get(`/maybe/${id}`)
		return rs
	}

	createLesson = async (data: any) => {
		const rs = await this.post(`/`, data)
		return rs
	}

	updateLesson = async (data: any) => {
		const rs = await this.put(`/`, data)
		return rs
	}

	deleteLesson = async (id: number) => {
		const rs = await this.delete(`/${id}`)
		return rs
	}

	addWord = async (data: any) => {
		const rs = await this.post(`/add-word`, data)
		return rs
	}

	removeWord = async (data: any) => {
		const rs = await this.delete(`/remove-word`, data)
		return rs
	}

	getTest = async (id: number) => {
		const rs = await this.get(`/get-tests/${id}`)
		return rs
	}
}
