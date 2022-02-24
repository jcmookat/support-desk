import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
	tickets: [],
	ticket: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

// Create new ticket
export const createTicket = createAsyncThunk(
	'tickets/create',
	async (ticketData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			return await ticketService.createTicket(ticketData, token) // function from authService
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	},
) // any name of function, second parameter and async first parameter

// Get user tickets
export const getTickets = createAsyncThunk(
	'tickets/getAll',
	async (_, thunkAPI) => {
		// we don't need to pass anything, but we need access to thunkAPI to get the token so we put underscore here '_'
		try {
			const token = thunkAPI.getState().auth.user.token
			return await ticketService.getTickets(token) // function from authService
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	},
) // any name of function, second parameter and async first parameter

export const ticketSlice = createSlice({
	name: 'ticket',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createTicket.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createTicket.fulfilled, (state) => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(createTicket.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(getTickets.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getTickets.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.tickets = action.payload
			})
			.addCase(getTickets.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	},
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer
