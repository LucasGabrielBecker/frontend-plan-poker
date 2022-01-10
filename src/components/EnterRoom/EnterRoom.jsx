import { useRef, useState } from 'preact/hooks'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FadeIn } from '../FadeIn'
import { ShareRoom } from '../ShareRoom'
import { DefaultButton } from '../DefaultButton'
import DefaultInput from '../DefaultInput/DefaultInput'
import ENV from '../../env'

const Nickname = () => {
	const [isOpen, setIsOpen] = useState(false)
	const roomId = useRef('')

	const navigate = useNavigate()
	const toggle = () => setIsOpen(prev => !prev)

	const toastErrorStyle = {
		icon: '🚫',
		style: {
			fontSize: '1.6rem',
			fontWeight: 600,
			backgroundColor: 'var(--primary-900)',
			color: 'var(--primary-100)',
		},
	}
	const toastResult = (msg, opt = null) => {
		toast(msg, opt)
	}

	const handleCreateRoom = async e => {
		e.preventDefault()
		navigate('admin/create-room')
	}

	const handleEnterRoom = async e => {
		e.preventDefault()

		const room = e.target.room.value
		const data = await fetch(`${ENV.BACKEND_URL}/check_room/${room}`)

		const res = await data.json()
		if (res.ok) {
			return navigate(`rooms?room=${room}`)
		} else toastResult(res.msg, toastErrorStyle)
	}

	return (
		<Container>
			<Form onSubmit={handleEnterRoom}>
				<Titles>Insira o código da sala</Titles>
				<FirstGroup>
					<DefaultInput
						type="text"
						name="room"
						autoComplete="off"
						style={{
							textTransform: 'uppercase',
							width: 150,
						}}
					/>
					<DefaultButton
						type="submit"
						style={{ width: 60, marginLeft: 10 }}
					>
						Entrar
					</DefaultButton>
				</FirstGroup>
			</Form>

			<Form
				className="second-form"
				onSubmit={handleCreateRoom}
				style={{ alignItems: 'flex-end' }}
			>
				<Titles>Ou crie uma sala e convide seu time</Titles>
				<DefaultButton type="submit" style={{ width: 100 }}>
					Criar sala
				</DefaultButton>
			</Form>

			{isOpen && (
				<FadeIn>
					<Modal toggle={toggle}>
						<ShareRoom roomId={roomId.current} />
					</Modal>
				</FadeIn>
			)}
		</Container>
	)
}

export default Nickname

const Container = styled.div`
	display: flex;
`
const Form = styled.form`
	display: flex;
	flex-direction: ${props => (props.row ? 'row-reverse' : 'column')};
	margin: 1rem;
`
const FirstGroup = styled.div`
	display: flex;
	align-items: center;
`
const Titles = styled.h2`
	color: var(--primary-600);
	margin-bottom: 1rem;
`
