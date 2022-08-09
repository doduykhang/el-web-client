import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../api/index.api'

const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	let navigate = useNavigate()

	const login = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		try {
			await api.authApi.login({ email, password })
			const res = await api.authApi.getProfile()
			//@TODO save to auth context
			console.log(res)
			navigate('/')
		} catch (err: any) {
			console.log(err.message)
		}
	}

	return (
		<div className='px-20'>
			<form onSubmit={login}>
				<div>Email</div>
				<input
					type='text'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<div>Password</div>
				<input
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type='submit'>Login</button>
			</form>
		</div>
	)
}

export default LoginPage
