import { useMemo } from 'preact/hooks'
import styled from 'styled-components'
import AvatarImage from '../../assets/BONECO.svg'
import { random } from '../../utils/random'

export const User = ({ user, alreadyVoted, showVotes }) => {
	const image = useMemo(() => random(1, 70), [user])

	return (
		<CustomUser>
			<div className='content'>
				<UserAvatar src={AvatarImage} />
				{user.username}
			</div>
			{showVotes ? (
				<VoteDisplayed>{user.points}</VoteDisplayed>
			) : (
				<span>{alreadyVoted}</span>
			)}
		</CustomUser>
	)
}
const CustomUser = styled.div`
	width: 90%;
	height: 40px;
	background-color: #fff;
	border: 1px solid #f0f0f0;
	border-radius: 12px;
	margin-top: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #003a59;
	padding: 0 20px;
	.content {
		width: 100%;
		display: flex;
		align-items: center;
	}
	span {
		font-size: 1.6rem;
	}
`

const UserAvatar = styled.img`
	width: 38px;
	height: 38px;
	margin-right: 30px;
	border-radius: 20px;
`

const VoteDisplayed = styled.span`
	font-weight: bold;
	font-size: 18px;
`

export default User
