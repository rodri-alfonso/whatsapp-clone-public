import { db } from '../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { where, collection, query } from 'firebase/firestore'

export function useGetUserByEmail(userEmail) {
	const [recipientSnapshot] = useCollection(query(collection(db, 'users'), where('email', '==', userEmail)))
	const user = recipientSnapshot?.docs?.[0]?.data()

	return { user, recipientSnapshot }
}
