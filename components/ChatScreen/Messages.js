import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useCollection } from 'react-firebase-hooks/firestore'
import { orderBy, collection, query, where } from 'firebase/firestore'
import Message from './Message'
import { db } from '../../firebase'

function Messages({ messages }) {
	const router = useRouter()
	const [messagesSnapshot] = useCollection(
		query(collection(db, 'chats', router.query.id, 'messages'), orderBy('timestamp', 'asc'))
	)

	if (messagesSnapshot) {
		return (
			<Container>
				{messagesSnapshot.docs.map((message) => (
					<Message
						key={message.id}
						user={message.data().user}
						message={{ ...message.data(), timestamp: message.data().timestamp?.toDate().getTime() }}
					/>
				))}
			</Container>
		)
	} else {
		return (
			<Container>
				{JSON.parse(messages).map((message) => (
					<Message key={message.id} user={message.user} message={message} />
				))}
			</Container>
		)
	}
}

export default Messages

const Container = styled.div`
	display: flex;
	flex-direction: column;
`
