export interface Test {
	id: number
	testName: string
	level: number
	time: number
}

export interface TestHistory {
	id: number
	startTime: string
	time: number
	score: number
	testId: number
	testName: string
	level: number
	lessonId: number
	lessonName: string
}
