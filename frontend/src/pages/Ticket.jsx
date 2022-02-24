import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

function Ticket() {
	const { ticket, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.tickets,
	) //state.tickets is from the store.js

	const params = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { ticketId } = useParams()

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}
		dispatch(getTicket(ticketId))
		// eslint-disable-next-line
	}, [isError, message, ticketId])

	// Close ticket
	const onTicketClose = () => {
		dispatch(closeTicket(ticketId))
		toast.success('Ticket Closed')
		navigate('/tickets')
	}

	if (isLoading) {
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
			</header>
			{ticket.status !== 'closed' && (
				<button className='btn btn-block btn-danger' onClick={onTicketClose}>
					Close Ticket
				</button>
			)}
		</div>
	)
}
export default Ticket
