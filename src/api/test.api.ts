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

	testHistory = async () => {
		const rs = await this.get(`/user/history`)
		return rs
	}

	testHistoryDetail = async (id: number) => {
		const rs = await this.get(`/user/history-detail/${id}`)
		return rs
	}

	testHistoryStat = async (id: number) => {
		const rs = await this.get(`/user/test-stat/${id}`)
		return rs
	}

	createTest = async (data: any) => {
		const rs = await this.post(`/`, data)
		return rs
	}

	updateTest = async (data: any) => {
		const rs = await this.put(`/`, data)
		return rs
	}

	deleteTest = async (id: number) => {
		const rs = await this.delete(`/${id}`)
		return rs
	}

	publishTest = async (id: number) => {
		const rs = await this.put(`/publish/${id}`)
		return rs
	}

	unpublishTest = async (id: number) => {
		const rs = await this.put(`/un-publish/${id}`)
		return rs
	}

	findOne = async (id: number) => {
		const rs = await this.get(`/${id}`)
		return rs
	}

	checkPublished = async (questionId: number) => {
		const rs = await this.get(`/check-published/${questionId}`)
		return rs
	}
}
