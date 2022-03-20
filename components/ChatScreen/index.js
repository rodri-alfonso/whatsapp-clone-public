import styled from '@emotion/styled'
import { useAuthState } from 'react-firebase-hooks/auth'

import { useRef } from 'react'
import { Avatar, IconButton } from '@mui/material'
import { auth } from '../../firebase'
import { ArrowBackIos } from '@mui/icons-material'

import TimeAgo from 'timeago-react'
import InputMessage from '../InputMessage'
import Messages from './Messages'
import { useRouter } from 'next/router'

import { useGetUserByEmail } from 'hooks/useGetUserByEmail'

function ChatScreen({ chat, messages }) {
	const [user] = useAuthState(auth)
	const router = useRouter()
	const recieverUserEmail = chat.users.filter((email) => email !== user.email)[0]
	const { user: recieverUser, recipientSnapshot } = useGetUserByEmail(recieverUserEmail)

	const endOfMessageRef = useRef(null)

	const scrollToBottom = () => {
		endOfMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	return (
		<Container>
			<Header>
				<ButtonBack onClick={() => router.push('/')}>
					<ArrowBackIos />
				</ButtonBack>
				{recieverUser ? <UserAvatar src={recieverUser?.photoURL} /> : <UserAvatar>{recieverUserEmail[0]}</UserAvatar>}

				<HeaderInformation>
					<h3>{recieverUser ? recieverUser?.displayName : recieverUserEmail}</h3>
					{recipientSnapshot ? (
						<p>
							Last active:{' '}
							{recieverUser?.lastSeen?.toDate() ? (
								<TimeAgo datetime={recieverUser?.lastSeen?.toDate()} />
							) : (
								'Unavailable'
							)}
						</p>
					) : (
						<p>Loading Last active...</p>
					)}
				</HeaderInformation>
			</Header>

			<MessageContainer>
				<Messages messages={messages} />
				<EndOfMessage ref={endOfMessageRef} />
			</MessageContainer>
			<InputMessage scrollToBottom={scrollToBottom} />
		</Container>
	)
}

export default ChatScreen

const Container = styled.div``

const UserAvatar = styled(Avatar)`
	width: 4rem;
	height: 4rem;
`

const HeaderInformation = styled.div`
	margin-left: 1.4rem;
	flex: 1;

	> h3 {
		margin: 0;
		font-size: 1.4rem;
		color: #e9edef;
		padding-bottom: 0.2rem;
		font-weight: 500;
	}
	> p {
		font-size: 1.2rem;
		color: #8696a0;
		margin: 0;
	}
`
const Header = styled.header`
	position: sticky;
	background-color: #202c33;
	z-index: 100;
	top: 0;
	display: flex;
	padding: 0 1.4rem;
	align-items: center;
	height: 6rem;
`
const MessageContainer = styled.div`
	padding: 3rem;
	background-color: #121b21;
	min-height: 90vh;
`

const EndOfMessage = styled.div`
	margin-bottom: 5rem;
`
const ButtonBack = styled(IconButton)`
	margin-right: 1rem;

	svg {
		color: #8696a0;
		width: 2rem;
		height: 2rem;
	}

	@media (min-width: 768px) {
		display: none;
	}
`
