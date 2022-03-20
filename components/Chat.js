import styled from '@emotion/styled'
import { Avatar } from '@mui/material'
import { useRouter } from 'next/router'
import { useGetUserByEmail } from 'hooks/useGetUserByEmail'

function Chat({ id, userEmail }) {
	const router = useRouter()
	const { user } = useGetUserByEmail(userEmail)

	const isSelected = id === router.query.id

	const handleEnterChat = () => {
		if (isSelected) router.push('/')
		else router.push(`/chat/${id}`)
	}

	return (
		<Container isSelected={isSelected} onClick={handleEnterChat}>
			<UserAvatar src={user && user?.photoURL}>{!user && userEmail[0]}</UserAvatar>
			<Information>
				{user ? (
					<>
						<h3>{user?.displayName}</h3>
						<p>{userEmail}</p>
					</>
				) : (
					<p>{userEmail}</p>
				)}
			</Information>
		</Container>
	)
}

export default Chat

const Container = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 1.5rem;
	word-break: break-word;
	font-size: 1.2rem;
	transition: background-color 0.2s ease-out;
	border-top: 1px solid #8696a026;
	border-bottom: 1px solid #8696a026;
	background-color: ${({ isSelected }) => (isSelected ? '#2a3942' : 'transparent')};

	:hover {
		background-color: ${({ isSelected }) => !isSelected && '#202c33'};
	}

	p {
		color: #8696a0;
	}
`
const UserAvatar = styled(Avatar)`
	margin-right: 1.5rem;

	width: 4.8rem;
	height: 4.8rem;
`
const Information = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;

	h3 {
		margin: 0;
		color: #e9edef;
		font-size: 1.6rem;
		font-weight: 500;
	}
	p {
		margin: 0;
		color: #8696a0;
	}
`
