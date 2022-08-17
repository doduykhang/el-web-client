import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../api/index.api'
import { AuthContext } from '../../../context/AuthContext'
import { ButtonCommon, InputCommon } from '../../common'

const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { update } = useContext(AuthContext)

	let navigate = useNavigate()

	const login = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		try {
			await api.authApi.login({ email, password })
			const res = await api.authApi.getProfile()
			console.log(res)
			update({
				firstName: res.firstName,
				lastName: res.lastName,
				role: res.role,
			})
			navigate('/')
		} catch (err: any) {
			console.log(err.message)
		}
	}

	return (
		<div className='u-page flex flex-col justify-center items-center'>
			<h1 className='text-2xl font-bold'>Login</h1>
			<form onSubmit={login}>
				<div className='form-control'>
					<label>Email</label>
					<InputCommon value={email} onChange={setEmail} />
				</div>

				<div className='form-control'>
					<label>Password</label>
					<InputCommon
						type='password'
						value={password}
						onChange={setPassword}
					/>
				</div>
				<div className='p-2' />
				<ButtonCommon htmlType='submit' className='btn-primary'>
					Login
				</ButtonCommon>
			</form>
		</div>
	)
}

export default LoginPage
