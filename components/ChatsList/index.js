import styled from '@emotion/styled'
import { collection, where, query } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import Chat from '../Chat'
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function ChatsList() {
	const [user] = useAuthState(auth)

	const userChatRef = query(collection(db, 'chats'), where('users', 'array-contains', user.email))
	const [chatsSnapshot] = useCollection(userChatRef)

	return (
		<Container>
			{chatsSnapshot?.docs.map((chat) => {
				const receiverEmail = chat.data().users.filter((email) => email !== user.email)[0]
				return <Chat key={chat.id} id={chat.id} userEmail={receiverEmail} />
			})}
		</Container>
	)
}

export default ChatsList

const Container = styled.div``
