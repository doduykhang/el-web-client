import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { word } from '../../types/word'
import { getRandomItem, shuffle } from '../../utils/utils.function'

interface Test {
	cards: word[]
	currentWordIndex: number
	rightAnswerCount: number
	wrongAnswerCount: number
	isCompleted: boolean
	options: string[]
}

const initialState: Test = {
	cards: [],
	currentWordIndex: 0,
	options: [],
	rightAnswerCount: 0,
	wrongAnswerCount: 0,
	isCompleted: false,
}

export const testSlice = createSlice({
	name: 'test',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setTest: (state, action: PayloadAction<word[]>) => {
			shuffle(action.payload)
			state.cards = action.payload
			state.currentWordIndex = 0
			state.wrongAnswerCount = 0
			state.rightAnswerCount = 0
			state.options = []

			if (action.payload.length) {
				for (let i = 0; i < 3; i++) {
					const word = getRandomItem(
						action.payload,
						state.currentWordIndex
					)
					state.options.push(word.word)
				}
				state.options.push(state.cards[state.currentWordIndex].word)
				shuffle(state.options)
			}
		},

		onAnswer: (state, action: PayloadAction<string>) => {
			if (state.cards[state.currentWordIndex].word === action.payload)
				state.rightAnswerCount++
			else state.wrongAnswerCount++

			if (state.currentWordIndex === state.cards.length - 1) {
				state.isCompleted = true
				return
			}

			state.currentWordIndex++

			state.options = []

			for (let i = 0; i < 3; i++) {
				const word = getRandomItem(state.cards)

				state.options.push(word.word)
			}
			state.options.push(state.cards[state.currentWordIndex].word)
			shuffle(state.options)
		},
	},
})

export const { setTest, onAnswer } = testSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default testSlice.reducer
