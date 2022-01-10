import { DefaultButton } from '../../components'
import styled from 'styled-components'
import { EVENTS } from '../../config/SocketEvents'
import { useReduce } from '../../context/socket'

export const AdminOptions = () => {
	const { dispatch } = useReduce()
	const handleShowVotes = () => {
		dispatch({
			type: EVENTS.EMITTERS.SHOW_VOTES
		})
	}
	return (
		<Container>
			<DefaultButton onClick={handleShowVotes}>Revelar votos</DefaultButton>
			<Spacer />
			<DefaultButton>Reiniciar Votação</DefaultButton>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-flow: column;
`

const Spacer = styled.div`
	height: 20px;
`
