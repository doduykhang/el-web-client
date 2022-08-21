export interface Test {
	id: number
	testName: string
	level: number
	time: number
  published: number
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

export interface TestHistoryDetail {
	testId: number
	content: string
	questionType: "CHOICE" | "FILL" |"AUDIO"
	userAnswer: string
	answer: string
}
