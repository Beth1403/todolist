import { createSlice} from '@reduxjs/toolkit';




export const todoSlice = createSlice({
	name: 'todos',
	initialState: [],
	reducers: {
		toggleTodo: (state, action) => {
			const todo = state.find((todo) => todo.id === action.payload);
			if (todo) {
				todo.completed = !todo.completed;
			}
		},
		
	},

});

export const { toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
