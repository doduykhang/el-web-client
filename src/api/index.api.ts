import { AuthApi } from './auth.api'
import { FolderApi } from './folder.api'
import { LessonApi } from './lesson.api'
import { OptionApi } from './option.api'
import { QuestionApi } from './question.api'
import { TestApi } from './test.api'
import { WordApi } from './word.api'

class api {
	static authApi = new AuthApi()
	static lessonApi = new LessonApi()
	static testApi = new TestApi()
	static questionApi = new QuestionApi()
	static wordApi = new WordApi()
	static folderApi = new FolderApi()
	static optionApi = new OptionApi()
}

export default api
