import styled from '@emotion/styled'
import Drawer from '@mui/material/Drawer'
import { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material'
import TextInput from './TextInput'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SearchIcon from '@mui/icons-material/Search'

import * as EmailValidator from 'email-validator'
import { auth, db } from '../firebase'
import { collection, addDoc, where, query } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'

function ChatCreator({ open, onClose }) {
	const router = useRouter()
	const [user] = useAuthState(auth)
	const userChatRef = query(collection(db, 'chats'), where('users', 'array-contains', user.email))
	const [chatsSnapshot] = useCollection(userChatRef)

	const [email, setEmail] = useState('')

	const chatAlreadyExists = () => {
		const documents = chatsSnapshot && chatsSnapshot.docs.map((doc) => doc.data())
		return documents.map((doc) => doc.users.includes(email))[0]
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!EmailValidator.validate(email)) return window.alert('Must to be a valid email')
		if (email === user.email) return window.alert('Must to be a different email')
		if (chatAlreadyExists()) return window.alert('The chat with this email already exist')

		addDoc(collection(db, 'chats'), {
			users: [user.email, email],
		}).then((email) => {
			setEmail('')
			onClose()
			router.push(`/chat/${email.id}`)
		})
	}

	return (
		<DrawerMenu
			sx={{
				flexShrink: 0,
			}}
			variant='persistent'
			anchor='left'
			onClose={onClose}
			open={open}
		>
			<Container onSubmit={handleSubmit}>
				<Header>
					<IconButton onClick={onClose}>
						<ArrowBackIcon />
					</IconButton>
					<h2>New chat</h2>
				</Header>
				<InputContainer>
					<TextInput
						placeholder="Write the user's email"
						icon={<SearchIcon />}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</InputContainer>

				<NextContainer>
					<IconButton type='submit' disabled={!email.trim()}>
						<ArrowForwardIcon />
					</IconButton>
				</NextContainer>
			</Container>
		</DrawerMenu>
	)
}

export default ChatCreator

const DrawerMenu = styled(Drawer)`
	& .MuiDrawer-paper {
		width: 36rem;
		box-sizing: border-box;
		border-right: 1px solid #374045;
		background-color: #111b21;
	}

	@media (max-width: 768px) {
		& .MuiDrawer-paper {
			width: 100%;
		}
	}
`

const Container = styled.form`
	overflow-y: auto;
`

const Header = styled.div`
	background-color: #202c33;
	color: #d9dee0;
	display: flex;
	gap: 2rem;
	align-items: center;
	padding: 1rem 1.6rem;

	svg {
		color: #d9dee0;
		width: 2.4rem;
		height: 2.4rem;
	}

	h2 {
		margin: 0;
		font-weight: 400;
		font-size: 1.9rem;
	}
`
const InputContainer = styled.div`
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`
const NextContainer = styled.div`
	display: grid;
	place-items: center;
	width: 36rem;
	position: fixed;
	bottom: 0;
	padding-bottom: 4rem;

	button {
		background-color: #00a884;

		:hover {
			background-color: #225c4b;
		}

		:disabled {
			background-color: #00a884;
			opacity: 0.4;
		}
	}
	svg {
		color: #d9dee0;
		width: 3.2rem;
		height: 3.2rem;
	}
`
