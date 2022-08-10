import { AuthApi } from './auth.api'
import { LessonApi } from './lesson.api'

class api {
	static authApi = new AuthApi()
	static lessonApi = new LessonApi()
}

export default api
