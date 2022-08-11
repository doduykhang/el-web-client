import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import api from './api/index.api'
import { HeaderCommon } from './components/common'
import ProtectedRoute from './components/common/ProtectedRoute'
import { FlashcardPage, HomePage, LessonDetailPage } from './components/module'
import LoginPage from './components/module/LoginPage/LoginPage'
import ProfilePage from './components/module/ProfilePage/ProfilePage'
import TestPage from './components/module/TestPage/TestPage'
import { AuthContext } from './context/AuthContext'

function App() {
	const { auth, update } = useContext(AuthContext)

	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		const getProfile = async () => {
			try {
				const profile = await api.authApi.getProfile()
				update(profile)
			} catch {
			} finally {
				setIsReady(true)
			}
		}
		getProfile()
	}, [])

	useEffect(() => {
		console.log(auth)
	}, [auth])

	if (!isReady) return <div>Loading...</div>

	return (
		<BrowserRouter>
			<HeaderCommon />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route
					path='/login'
					element={
						<ProtectedRoute isAllow={auth.role === ''} redirect='/'>
							<LoginPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/lesson-detail/:id'
					element={<LessonDetailPage />}
				/>
				<Route path='/flashcard' element={<FlashcardPage />} />
				<Route
					path='/profile'
					element={
						<ProtectedRoute
							isAllow={auth.role === 'ADMIN'}
							redirect='/login'
						>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>
				<Route path='/test' element={<TestPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
