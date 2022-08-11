import { configureStore } from '@reduxjs/toolkit'
import cardSlice from './card/cardSlice'
import counterSlice from './counter/counterSlice'
import testSlice from './test/testSlice'
// ...

export const store = configureStore({
	reducer: {
		counter: counterSlice,
		card: cardSlice,
		test: testSlice,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
