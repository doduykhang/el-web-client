import { serializeQuery } from './api.utils'
import { BaseApi } from './base.api'

export class FolderApi extends BaseApi {
	constructor() {
		super('api/folder')
	}

	getFolder = async (data: any) => {
		const query = serializeQuery(data)
		const rs = await this.get(`/all?${query}`)
		return rs
	}

	createFolder = async (data: any) => {
		const rs = await this.post('', data)
		return rs
	}

	updateFolder = async (data: any) => {
		const rs = await this.put('', data)
		return rs
	}

	deleteFolder = async (id: number) => {
		const rs = await this.delete(`/${id}`)
		return rs
	}

	getFolderWithSave = async (id: number) => {
		const rs = await this.get(`/save/${id}`)
		return rs
	}

	addWord = async (data: any) => {
		const rs = await this.post(`/add`, data)
		return rs
	}

	removeWord = async ({
		folderID,
		wordID,
	}: {
		folderID: number
		wordID: number
	}) => {
		const rs = await this.delete(`/remove/${folderID}/${wordID}`)
		return rs
	}

	getWordOfFolder = async (id: number) => {
		const rs = await this.get(`/words/${id}`)
		return rs
	}
}
