import { AuthApi } from './auth.api'
import { LessonApi } from './lesson.api'
import { QuestionApi } from './question.api'
import { TestApi } from './test.api'

class api {
	static authApi = new AuthApi()
	static lessonApi = new LessonApi()
	static testApi = new TestApi()
	static questionApi = new QuestionApi()
}

export default api
