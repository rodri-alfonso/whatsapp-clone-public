import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
	//here you have to set your firebase config
	apiKey: '',
	authDomain: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: '',
	appId: '',
}

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()
const provider = new GoogleAuthProvider()

export { auth, provider, app, db }
