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
			return await ticketService.createTicket(ticketData, token) // function from ticketService
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
			return await ticketService.getTickets(token) // function from ticketService
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

// Get ticket
export const getTicket = createAsyncThunk(
	'tickets/get',
	async (ticketId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			return await ticketService.getTicket(ticketId, token) // function from ticketService
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

// Close Ticket
export const closeTicket = createAsyncThunk(
	'tickets/close',
	async (ticketId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token
			return await ticketService.closeTicket(ticketId, token) // function from ticketService
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
			.addCase(getTicket.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getTicket.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.ticket = action.payload
			})
			.addCase(getTicket.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(closeTicket.fulfilled, (state, action) => {
				state.isLoading = false
				state.tickets.map((ticket) =>
					ticket._id === action.payload._id
						? (ticket.status = 'closed')
						: ticket,
				) // we did this so that the state would be updated and have a closed status on the front end, and no need to reload to get the status from the backend
			})
	},
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer
