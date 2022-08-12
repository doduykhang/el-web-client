export interface Question {
	id: number
	content: string
	answer: string
	questionType: 'FILL' | 'CHOICE' | 'AUDIO'
}
