import styled from 'styled-components'
import CloseIconSvg from '../../assets/close_icon.svg'

export function Modal({ isOpen, toggle, children }) {
	if (isOpen) return null
	return (
		<CustomModal>
			<div className="content">
				<CloseIcon src={CloseIconSvg} alt="coseIcon" onClick={toggle} />
				{children}
			</div>
		</CustomModal>
	)
}

export const CustomModal = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: grid;
	place-items: center;

	.content {
		background-color: #fff;
		color: #696969;
		border-radius: 2rem;
		width: 60%;
		height: 60%;
		position: relative;
		padding: 3rem;
	}
`

const CloseIcon = styled.img`
	position: absolute;
	top: 2rem;
	right: 2rem;
	width: 3rem;
	height: var(--tap-area-height);
	cursor: pointer;
	transition: transform 600ms;

	&:hover {
		transform: rotate(90deg);
		transition: transform 300ms;
	}
`
