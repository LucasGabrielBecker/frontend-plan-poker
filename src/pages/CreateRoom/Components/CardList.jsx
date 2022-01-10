import styled from 'styled-components'
import TrashIcon from '../../../assets/trash.svg'

export function CardList({ cards, handleDeleteCard }) {
	if (!cards.length) return null
	return (
		<Container>
			<ul>
				{cards.map(card => (
					<li>
						<div className="card">
							<span>{card.title}</span>
							<p>{card.description}</p>
						</div>
						<img
							src={TrashIcon}
							width={18}
							onClick={() => handleDeleteCard(card.id)}
						/>
					</li>
				))}
			</ul>
		</Container>
	)
}

const Container = styled.div`
	width: 20rem;
	position: absolute;
	top: 2rem;
	left: 4rem;

	li {
		background-color: #fff;
		border-radius: 1rem;
		color: #696969;
		display: flex;
		padding: 1.4rem;
		text-align: left;
		text-transform: capitalize;
		justify-content: space-between;
		box-shadow: var(--shadow-elevation-medium);
		&:not(:first-child) {
			margin-top: 1rem;
		}
	}

	li > div > p {
		color: #878787;
	}

	li > img {
		cursor: pointer;
	}
`
