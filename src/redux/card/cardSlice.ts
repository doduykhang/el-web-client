import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { word } from '../../types/word'
import { shuffle } from '../../utils/utils.function'

interface CardState {
	cards: word[]
	currentWordIndex: number
	rightAnswerCount: number
	wrongAnswersCount: number
	isCompleted: boolean
}

const initialState: CardState = {
	cards: [],
	currentWordIndex: 0,
	rightAnswerCount: 0,
	wrongAnswersCount: 0,
	isCompleted: false,
}

export const cardSlice = createSlice({
	name: 'card',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setCard: (state, action: PayloadAction<word[]>) => {
			shuffle(action.payload)
			state.cards = action.payload
			state.currentWordIndex = 0
			state.rightAnswerCount = 0
			state.wrongAnswersCount = 0
			state.isCompleted = false
		},
		onLearnAgain: (state, _: PayloadAction) => {
			shuffle(state.cards)
			state.currentWordIndex = 0
			state.rightAnswerCount = 0
			state.wrongAnswersCount = 0
			state.isCompleted = false
		},
		onAnswerRight(state, _: PayloadAction) {
			if (state.currentWordIndex === state.cards.length) return
			state.rightAnswerCount = state.rightAnswerCount + 1
			if (state.currentWordIndex === state.cards.length - 1) {
				state.isCompleted = true
				return
			}
			state.currentWordIndex = state.currentWordIndex + 1
		},
		onAnswerWrong(state, _: PayloadAction) {
			if (state.currentWordIndex === state.cards.length) return
			state.wrongAnswersCount = state.wrongAnswersCount + 1
			if (state.currentWordIndex === state.cards.length - 1) {
				state.isCompleted = true
				return
			}
			state.currentWordIndex = state.currentWordIndex + 1
		},
	},
})

export const { setCard, onAnswerRight, onAnswerWrong, onLearnAgain } =
	cardSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default cardSlice.reducer
