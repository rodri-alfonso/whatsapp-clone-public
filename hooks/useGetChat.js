import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const useGetChat = (chatId) => {
	const [chat, setChat] = useState(null)

	useEffect(() => {
		const fetchChat = async () => {
			const ref = doc(db, 'chats', chatId)
			const chatRes = await getDoc(ref)
			setChat({
				id: chatRes.id,
				...chatRes.data(),
			})
		}
		fetchChat()
	}, [chatId])

	return { chat }
}
