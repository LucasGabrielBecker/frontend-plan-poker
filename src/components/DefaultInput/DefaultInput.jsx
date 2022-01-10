import styled from 'styled-components'

const DefaultInput = ({ width = 100, ...delegated }) => {
	return <Input autoComplete="off" {...delegated} />
}

export default DefaultInput

const Input = styled.input`
	width: ${props => props.width}px;
	height: var(--tap-area-height);
	border: none;
	background-color: #fff;
	outline: none;
	border-radius: 1rem;
	font-size: 2rem;
	color: var(--primary-800);
	padding-left: 0.8rem;
	&:focus {
		border: 1px solid var(--primary-400);
	}
`
