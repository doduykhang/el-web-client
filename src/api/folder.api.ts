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
}
