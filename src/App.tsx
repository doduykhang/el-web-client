import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HeaderCommon } from './components/common'
import { FlashcardPage, HomePage, LessonDetailPage } from './components/module'
import LoginPage from './components/module/LoginPage/LoginPage'

function App() {
	return (
		<BrowserRouter>
			<HeaderCommon />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/lesson-detail' element={<LessonDetailPage />} />
				<Route path='/flashcard' element={<FlashcardPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
