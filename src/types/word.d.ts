export interface word {
	id: int
	word: string
	definition: string
	example: string
	type: string
	pronounciation: string
}

export interface WordWithSave extends word {
	saved: boolean
}
