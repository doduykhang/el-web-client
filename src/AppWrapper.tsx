import App from './App'
import { AuthProvider } from './context/AuthContext'

const AppWrapper = () => {
	return (
		<AuthProvider>
			<App />
		</AuthProvider>
	)
}

export default AppWrapper
