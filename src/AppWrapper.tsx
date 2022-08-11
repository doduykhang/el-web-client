import { Provider } from 'react-redux'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { store } from './redux/store'

const AppWrapper = () => {
	return (
		<Provider store={store}>
			<AuthProvider>
				<App />
			</AuthProvider>
		</Provider>
	)
}

export default AppWrapper
