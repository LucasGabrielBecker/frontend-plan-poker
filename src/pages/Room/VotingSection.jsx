import { useCallback, useState } from 'preact/hooks'
import styled from 'styled-components'
import { User } from '../../components'
import { useReduce } from '../../context/socket'
import { useLocation } from 'react-router-dom'
import { VoteWrapper } from './VoteWrapper'
import { AdminOptions } from './AdminOptions'
import { EVENTS } from '../../config/SocketEvents'

export const VotingSection = () => {
	const { state, dispatch } = useReduce()
	const { users, cards, usersAlreadyVoted, showVotes } = state
	const { pathname } = useLocation()
	const isAdmin = pathname.includes('admin')
	const [voted, setVoted] = useState(false)
	const [selectedPoint, setSelectedPoint] = useState(0)

	const onChange = useCallback(e => {
		setSelectedPoint(e.target.value)
	}, [])

	const handleVote = useCallback(e => {
		e.preventDefault()
		const selected = e.target.points.value
		const { _id } = cards[0]
		const user = JSON.parse(localStorage.getItem('user'))
		const body = {
			userId: user.id,
			cardId: _id,
			points: selected
		}

		setSelectedPoint(selected)
		dispatch({ type: EVENTS.EMITTERS.VOTE, payload: body })
		setVoted(true)
	}, [])

	const getStates = () => {
		return {
			handleVote,
			voted,
			onChange,
			selectedPoint
		}
	}

	return (
		<VotingWrapper>
			<h1>Votando</h1>
			{users?.length
				? users?.map(user => (
						<User
							user={user}
							showVotes={showVotes}
							alreadyVoted={usersAlreadyVoted.includes(user.id) ? '🏴' : '?'}
						/>
				  ))
				: null}

			{!isAdmin ? (
				<VoteWrapper getStates={getStates} />
			) : (
				<AdminOptions users={users} />
			)}
		</VotingWrapper>
	)
}

const VotingWrapper = styled.div`
	width: 40%;
	height: 100%;
	max-width: 600px;
	padding: 2rem;
	color: #696969;
	transition: transform 200ms;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	border-radius: 3rem;
	background: #fff;
	border: 1px solid #696969;

	@media (max-width: 768px) {
		flex-direction: column;
		height: 40rem;
		width: 30rem;
	}
`
