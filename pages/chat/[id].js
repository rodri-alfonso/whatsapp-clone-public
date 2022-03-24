import styled from '@emotion/styled'
import Head from 'next/head'
import Sidebar from '../../components/Sidebar'
import ChatScreen from '../../components/ChatScreen'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db, auth } from '../../firebase'
import { useGetChat } from 'hooks/useGetChat'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'

function Chat({ messages }) {
	const router = useRouter()
	const [user] = useAuthState(auth)
	const { chat } = useGetChat(router.query.id)
	const recieverUserEmail = chat && chat.users.filter((email) => email !== user.email)[0]

	return (
		<Container>
			<Head>
				<title>Chat with {recieverUserEmail}</title>
			</Head>
			<SidebarContainer>
				<Sidebar />
			</SidebarContainer>
			<ChatContainer>
				<ChatScreen messages={messages} recieverUserEmail={recieverUserEmail} />
			</ChatContainer>
		</Container>
	)
}

export default Chat

export async function getServerSideProps(context) {
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

	return {
		props: {
			messages: JSON.stringify(messages),
			// chat,
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
