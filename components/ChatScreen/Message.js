import styled from '@emotion/styled'
import moment from 'moment'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

function Message({ user, message }) {
	const [userLoggedIn] = useAuthState(auth)

	const time = message.timestamp ? moment(message.timestamp).format('LT') : '...'
	const isSender = userLoggedIn.email === user

	const TypeOfMessage = ({ children }) => {
		if (isSender) {
			return <Sender>{children}</Sender>
		} else {
			return <Reciever>{children}</Reciever>
		}
	}

	return (
		<Container isSender={isSender}>
			<TypeOfMessage>
				<p>{message.message}</p>
				<Time>{time}</Time>
			</TypeOfMessage>
		</Container>
	)
}

export default Message

const Container = styled.div`
	display: flex;
	align-items: center;
	flex-direction: ${({ isSender }) => (isSender ? 'row-reverse' : 'row')};
`

const MessageElement = styled.p`
	width: fit-content;
	border-radius: 0.8rem;
	margin: 0.6rem;
	min-width: 11.8rem;
	max-width: 39.7rem;
	text-align: left;
	display: flex;
	align-items: center;
	word-break: break-word;
	font-size: 1.3rem;
	color: #e9edef;

	p {
		padding: 1rem 1.5rem;
		margin: 0;
	}
`

const Sender = styled(MessageElement)`
	background-color: #225c4b;
	margin-left: auto;
`
const Reciever = styled(MessageElement)`
	background-color: #202c33;

	span {
		color: hsla(0, 0%, 100%, 0.6);
	}
`

const Time = styled.span`
	color: #8bb5ae;
	font-size: 0.9rem;
	margin-left: ${({ isSender }) => (isSender ? 'auto' : '0')};
	display: flex;
	justify-content: flex-end;
	flex: 1;
	min-height: 3.3rem;
	align-items: flex-end;
	padding: 0 1rem 0.4rem 0;
	white-space: nowrap;
`
