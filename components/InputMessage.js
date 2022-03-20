import styled from '@emotion/styled'
import { useState } from 'react'

import { InsertEmoticon } from '@mui/icons-material'
import SendIcon from '@mui/icons-material/Send'
import { doc, collection, serverTimestamp, setDoc, addDoc } from 'firebase/firestore'
import { IconButton } from '@mui/material'
import { db, auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'

function InputMessage({ scrollToBottom }) {
	const [user] = useAuthState(auth)
	const [message, setMessage] = useState('')
	const router = useRouter()

	const sendMessage = (e) => {
		e.preventDefault()

		//update the last seen
		setDoc(
			doc(db, 'users', user.uid),
			{
				lastSeen: serverTimestamp(),
			},
			{ merge: true }
		)

		addDoc(collection(db, 'chats', router.query.id, 'messages'), {
			timestamp: serverTimestamp(),
			message: message,
			user: user.email,
		})
		setMessage('')
		scrollToBottom()
	}

	return (
		<Container onSubmit={sendMessage}>
			<InsertEmoticon />
			<Input placeholder='Write a message here' value={message} onChange={(e) => setMessage(e.target.value)} />
			<SentButton disabled={!message.trim()} type='submit'>
				<SendIcon />
			</SentButton>
		</Container>
	)
}

export default InputMessage

const Container = styled.form`
	display: flex;
	align-items: center;
	padding: 1rem 2rem 1rem 1rem;
	position: sticky;
	bottom: 0;
	background-color: #202c33;
	z-index: 100;
	gap: 1rem;

	svg {
		width: 2.6rem;
		height: 2.6rem;
		color: #8696a0;
	}
`

const Input = styled.input`
	flex: 1;
	outline: 0;
	padding: 2rem;
	height: 4.2rem;
	border: none;
	border-radius: 1rem;
	background-color: #2a3942;
	color: #e9edef;
	font-size: 1.4rem;

	&::placeholder {
		color: #8696a0;
	}
`
const SentButton = styled(IconButton)`
	background-color: #0b846d;
	color: #e9edef;

	:disabled {
		color: #e9edef;
		background-color: #0b846d;
		opacity: 0.4;
	}

	svg {
		margin-left: 0.2rem;
		color: #ffffff;
		width: 1.8rem;
		height: 1.8rem;
	}

	:hover {
		background: #00927e;
	}
`
