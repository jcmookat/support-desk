import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, reset as notesReset } from '../features/notes/noteSlice'
import NoteItem from '../components/NoteItem'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

function Ticket() {
	const { ticket, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.tickets,
	) //state.tickets is from the store.js

	const { notes, isLoading: notesIsLoading } = useSelector(
		// since isLoading already exists, renamed to notesIsLoading
		(state) => state.notes,
	) //state.notes is from the store.js

	const params = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { ticketId } = useParams()

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}
		dispatch(getTicket(ticketId))
		dispatch(getNotes(ticketId))
		// eslint-disable-next-line
	}, [isError, message, ticketId])

	// Close ticket
	const onTicketClose = () => {
		dispatch(closeTicket(ticketId))
		toast.success('Ticket Closed')
		navigate('/tickets')
	}

	if (isLoading || notesIsLoading) {
		return <Spinner />
	}

	if (isError) {
		return <h3>Something Went Wrong</h3>
	}

	return (
		<div className='ticket-page'>
			<header className='ticket-header'>
				<BackButton url='/tickets' />
				{/* ticket._id is from the state using the useSelector */}
				<h2>
					Ticket ID: {ticket._id}
					<span className={`status status-${ticket.status}`}>
						{ticket.status}
					</span>
				</h2>
				<h3>
					Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
				</h3>
				<h3>Product: {ticket.product}</h3>
				<hr />
				<div className='ticket-desc'>
					<h3>Description of Issue</h3>
					<p>{ticket.description}</p>
				</div>
				<h2>Notes</h2>
			</header>
			{notes.map((note) => (
				<NoteItem key={note._id} note={note} />
			))}
			{ticket.status !== 'closed' && (
				<button className='btn btn-block btn-danger' onClick={onTicketClose}>
					Close Ticket
				</button>
			)}
		</div>
	)
}
export default Ticket
