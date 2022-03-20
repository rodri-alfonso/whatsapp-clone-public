import styled from '@emotion/styled'
import Head from 'next/head'
import Sidebar from '../../components/Sidebar'
import ChatScreen from '../../components/ChatScreen'
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { db, auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function Chat({ chat, messages }) {
	const [user] = useAuthState(auth)
	const receiverEmail = chat.users.filter((email) => email !== user.email)[0]

	return (
		<Container>
			<Head>
				<title>Chat with {receiverEmail}</title>
			</Head>
			<SidebarContainer>
				<Sidebar />
			</SidebarContainer>
			<ChatContainer>
				<ChatScreen chat={chat} messages={messages} />
			</ChatContainer>
		</Container>
	)
}

export default Chat

export async function getServerSideProps(context) {
	const ref = doc(db, 'chats', context.query.id)

	//PREP the messages on the server
	const messagesRes = await getDocs(
		query(collection(db, 'chats', context.query.id, 'messages'), orderBy('timestamp', 'asc'))
	)

	const messages = messagesRes.docs
		.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		.map((messages) => ({
			...messages,
			timestamp: messages.timestamp.toDate().getTime(),
		}))

	// PREP the chats
	const chatRes = await getDoc(ref)
	const chat = {
		id: chatRes.id,
		...chatRes.data(),
	}

	return {
		props: {
			messages: JSON.stringify(messages),
			chat,
		},
	}
}

const Container = styled.div`
	display: flex;
`
const ChatContainer = styled.div`
	flex: 1;
	overflow: scroll;
	height: 100vh;

	::-webkit-scrollbar {
		display: none;
	}

	-ms-overflow-style: none; /* IE / Edge */
	scrollbar-width: none; /* Firefox */
`
const SidebarContainer = styled.div`
	@media (max-width: 768px) {
		display: none;
	}
`
