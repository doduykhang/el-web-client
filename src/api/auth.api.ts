import { BaseApi } from './base.api'

export class AuthApi extends BaseApi {
	constructor() {
		super('')
	}

	register = async (data: any) => {
		const rs = await this.post('register', data)
		return rs
	}

	login = async (data: any) => {
		const rs = await this.post('login', data)
		return rs
	}

	logout = async () => {
		const rs = await this.post('logout')
		return rs
	}

	getProfile = async () => {
		const rs = await this.get('profile')
		return rs
	}
}
