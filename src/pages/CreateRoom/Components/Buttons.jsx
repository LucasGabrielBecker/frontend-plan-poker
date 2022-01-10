import styled, { keyframes } from 'styled-components'
import { FadeIn, DefaultButton } from '../../../components'

export function Buttons({ roomId }) {
	return (
		<FadeIn duration={800}>
			<Copy>
				<h2>Copie o link e envie para seu time</h2>
				<DefaultButton
					type="button"
					onClick={() =>{
						navigator.clipboard.writeText(
							`${window.location.origin}/rooms?room=${roomId}`
						)}
					}
				>
					Copiar Link
				</DefaultButton>

				<h2 style={{ marginTop: 30 }}>Ou copie o código mesmo</h2>
				<DefaultButton
					type="button"
					onClick={() => navigator.clipboard.writeText(roomId)}
				>
					Copiar código
				</DefaultButton>
			</Copy>
		</FadeIn>
	)
}

const AnimationSlideDown = keyframes`
	from{
		transform: translateY(-5%);
			opacity: 0.25;
	} to {
		transform: translateY(0%);
			opacity: 1;
	}
`

const Copy = styled.div`
	display: flex;
	flex-flow: column;
	margin-top: 30px;
	width: 400px;
	animation: ${AnimationSlideDown} 300ms;
`
