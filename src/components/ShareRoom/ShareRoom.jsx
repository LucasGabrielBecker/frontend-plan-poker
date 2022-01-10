import styled from 'styled-components'

function ShareRoom({ roomId }) {
	const handleCopy = () => {
		navigator.clipboard.writeText(`${window.location.origin}/rooms?room=${roomId}`)
	}
	return (
		<Container>
			<span>Compartilhe este link para sua sala!</span>
			<div className="btn" onClick={handleCopy}>
				Copiar
			</div>
		</Container>
	)
}

const Container = styled.div`
	span {
		margin-top: 3rem;
		color: #696969;
		padding: 3rem;
	}

	.btn {
		width: 22rem;
		height: var(--tap-area-height);
		background-color: var(--background-card);
		display: grid;
		place-items: center;
		cursor: pointer;
	}
`

export default ShareRoom
