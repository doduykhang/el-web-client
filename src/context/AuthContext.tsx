import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface AuthContextInterface {
	firstName: string
	lastName: string
	role: string
}
type UpdateType = Dispatch<SetStateAction<AuthContextInterface>>

const defaultAuthContext: AuthContextInterface = {
	firstName: '',
	lastName: '',
	role: '',
}
const defaultUpdate: UpdateType = () => defaultAuthContext

interface authState {
	auth: AuthContextInterface
	update: UpdateType
}

const defaultAuthState: authState = {
	auth: defaultAuthContext,
	update: defaultUpdate,
}

export const AuthContext = createContext(defaultAuthState)

interface props {
	children: React.ReactNode
}

export const AuthProvider = ({ children }: props) => {
	const [auth, setAuth] = useState(defaultAuthContext)

	return (
		<AuthContext.Provider value={{ auth: auth, update: setAuth }}>
			{children}
		</AuthContext.Provider>
	)
}
