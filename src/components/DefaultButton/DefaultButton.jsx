import styled from 'styled-components'

const DefaultButton = ({ children, width = 100, ...delegated }) => (
	<Button children={children} {...delegated} />
)

export default DefaultButton

const Button = styled.button`
	width: ${props => props.width}px;
	outline: none;
	border: none;
	height: var(--tap-area-height);
	border-radius: 1rem;
	color: #fff;
	font-size: 1.4rem;
	font-weight: 600;
	background-color: var(--primary-600);
	cursor: pointer;
	&:hover {
		transition: background-color 300ms;
		background-color: var(--primary-400);
	}
`
