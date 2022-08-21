import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import api from './api/index.api'

import 'antd/dist/antd.css'
import { HeaderCommon } from './components/common'
import ProtectedRoute from './components/common/ProtectedRoute'
import {
	FlashcardPage,
	FolderDetailPage,
	FolderPage,
	HomePage,
	LessonDetailPage,
	SearchWordPage,
} from './components/module'
import AdminPage from './components/module/AdminPage/AdminPage'
import HistoryDetailPage from './components/module/HistoryDetailPage/HistoryDetailPage'
import HistoryPage from './components/module/HistoryPage/HistoryPage'
import LessonCURD from './components/module/LessonCRUD/LessonCRUD'
import LoginPage from './components/module/LoginPage/LoginPage'
import OptionCRUD from './components/module/OptionCRUD/OptionCRUD'
import ProfilePage from './components/module/ProfilePage/ProfilePage'
import QuestionCRUD from './components/module/QuestionCRUD/QuestionCRUD'
import RealTestPage from './components/module/RealTestPage/RealTestPage'
import TestCRUD from './components/module/TestCRUD/TestCRUD'
import WordCURD from './components/module/WordCRUD/WordCRUD'
import { AuthContext } from './context/AuthContext'
import RegisterPage from './components/module/RegisterPage/RegisterPage'

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
				<Route
					path='/'
					element={
						<ProtectedRoute
							isAllow={auth.role !== 'ADMIN'}
							redirect={auth.role === 'ADMIN' ? '/admin' : '/'}
						>
							<HomePage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/login'
					element={
						<ProtectedRoute
							isAllow={auth.role === ''}
							redirect={auth.role === 'ADMIN' ? '/admin' : '/'}
						>
							<LoginPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/register'
					element={
						<ProtectedRoute
							isAllow={auth.role === ''}
							redirect={auth.role === 'ADMIN' ? '/admin' : '/'}
						>
							<RegisterPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/lesson-detail/:id'
					element={
						<ProtectedRoute
							isAllow={auth.role !== 'ADMIN'}
							redirect={auth.role === 'ADMIN' ? '/admin' : '/'}
						>
							<LessonDetailPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/flashcard'
					element={
						<ProtectedRoute
							isAllow={auth.role === 'USER'}
							redirect={
								auth.role === 'ADMIN' ? '/admin' : '/login'
							}
						>
							<FlashcardPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/profile'
					element={
						<ProtectedRoute
							isAllow={auth.role === 'ADMIN'}
							redirect={auth.role === 'ADMIN' ? '/admin' : '/'}
						>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/folder'
					element={
						<ProtectedRoute
							isAllow={auth.role === 'USER'}
							redirect={
								auth.role === 'ADMIN' ? '/admin' : '/login'
							}
						>
							<FolderPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/folder-detail/:id'
					element={
						<ProtectedRoute
							isAllow={auth.role === 'USER'}
							redirect={
								auth.role === 'ADMIN' ? '/admin' : '/login'
							}
						>
							<FolderDetailPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/history/'
					element={
						<ProtectedRoute
							isAllow={auth.role === 'USER'}
							redirect={
								auth.role === 'ADMIN' ? '/admin' : '/login'
							}
						>
							<HistoryPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/history-detail/:testId/:id'
					element={
						<ProtectedRoute
							isAllow={auth.role === 'USER'}
							redirect={
								auth.role === 'ADMIN' ? '/admin' : '/login'
							}
						>
							<HistoryDetailPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/admin'
					element={
						<ProtectedRoute
							isAllow={auth.role === 'ADMIN'}
							redirect='/login'
						>
							<AdminPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/test/:id'
					element={
						<ProtectedRoute
							isAllow={auth.role === 'USER'}
							redirect={
								auth.role === 'ADMIN' ? '/admin' : '/login'
							}
						>
							<RealTestPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/search-word'
					element={
						<ProtectedRoute
							isAllow={auth.role !== 'ADMIN'}
							redirect={auth.role === 'ADMIN' ? '/admin' : '/'}
						>
							<SearchWordPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/admin/word'
					element={
						<ProtectedRoute
							isAllow={auth.role === 'ADMIN'}
							redirect={'/'}
						>
							<WordCURD />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/admin/lesson'
					element={
						<ProtectedRoute
							isAllow={auth.role === 'ADMIN'}
							redirect={'/'}
						>
							<LessonCURD />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/admin/test/:id'
					element={
						<ProtectedRoute
							isAllow={auth.role === 'ADMIN'}
							redirect={'/'}
						>
							<TestCRUD />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/admin/questions/:id'
					element={
						<ProtectedRoute
							isAllow={auth.role === 'ADMIN'}
							redirect={'/'}
						>
							<QuestionCRUD />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/admin/options/:id'
					element={
						<ProtectedRoute
							isAllow={auth.role === 'ADMIN'}
							redirect={'/'}
						>
							<OptionCRUD />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
