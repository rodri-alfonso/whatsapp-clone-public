import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import { auth, db } from '../firebase'
import Login from './login'
import Loading from '../components/Loading'
import { serverTimestamp, setDoc, doc } from 'firebase/firestore'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Router from 'next/router'

function MyApp({ Component, pageProps }) {
	const [user, loading] = useAuthState(auth)

	useEffect(() => {
		if (user) {
			setDoc(
				doc(db, 'users', user.uid),
				{
					email: user.email,
					lastSeen: serverTimestamp(),
					photoURL: user.photoURL,
					displayName: user.displayName,
				},
				{ merge: true }
			)
		}
	}, [user])

	Router.events.on('routeChangeStart', () => {
		NProgress.start()
	})
	Router.events.on('routeChangeComplete', () => NProgress.done())
	Router.events.on('routeChangeError', () => NProgress.done())

	if (loading) return <Loading />
	if (!user) return <Login />

	return <Component {...pageProps} />
}

export default MyApp
