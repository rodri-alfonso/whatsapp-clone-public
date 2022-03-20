import styled from '@emotion/styled'
import Head from 'next/head'
import { Button, IconButton } from '@mui/material'
import { auth, provider } from '../../firebase'
import { signInWithPopup } from 'firebase/auth'
import GitHubIcon from '@mui/icons-material/GitHub'

function Login() {
	const signIn = () => {
		signInWithPopup(auth, provider).catch((error) => alert(`There was an error logging in: ${error}`))
	}

	return (
		<ExternalContainer>
			<Container>
				<Head>
					<title>WhatsApp clone - Login</title>
				</Head>
				<LittleShape />
				<BigShape />

				<Content>
					<Information>
						<h1>WhatsApp Web</h1>
						<Subheading>
							<h2>CLONE</h2>
							<span>DEMO</span>
						</Subheading>
						<Button variant='outlined' onClick={signIn}>
							Sign in with Google
						</Button>
					</Information>
					<GithubButton>
						<GitHubIcon />
					</GithubButton>
				</Content>
			</Container>
		</ExternalContainer>
	)
}

export default Login

const ExternalContainer = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;
`
const Container = styled.div`
	display: grid;
	position: relative;
	width: 100%;
	max-width: 80rem;
	height: 50rem;
	overflow: hidden;
	border-radius: 10px;

	@media only screen and (max-width: 767px) {
		width: 100%;
		height: 100vh;

		overflow: auto;
		border-radius: 0;
	}
`
const Content = styled.div`
	padding: 5rem;
	height: 100%;

	background: rgba(34, 46, 53, 0.35);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
	backdrop-filter: blur(1px);
	-webkit-backdrop-filter: blur(9px);
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.18);

	@media only screen and (max-width: 767px) {
		border-radius: 0;
		border: unset;
		box-shadow: unset;
		padding: 2rem;
	}
`

const LittleShape = styled.div`
	background: rgb(90, 211, 155);
	background: linear-gradient(299deg, rgba(90, 211, 155, 1) 0%, rgba(68, 169, 132, 1) 74%, rgba(68, 169, 132, 1) 76%);
	width: 120px;
	height: 40px;
	position: absolute;
	border-radius: 0 0 60% 40% / 0 20% 80% 50%;
`

const BigShape = styled.div`
	background: rgb(90, 211, 155);
	background: linear-gradient(299deg, rgba(90, 211, 155, 1) 0%, rgba(68, 169, 132, 1) 74%, rgba(68, 169, 132, 1) 76%);
	width: 300px;
	height: 500px;
	position: absolute;
	right: 0;
	top: 0;
	border-radius: 80% 20% 0 80% / 80% 0 0 20%;

	@media only screen and (max-width: 767px) {
		bottom: 0;
		top: unset;
	}
`
const Information = styled.div`
	display: flex;
	flex-direction: column;
	height: 28rem;
	justify-content: flex-end;
	z-index: 200;

	h1 {
		margin: 0;
		font-size: 3.6rem;
		font-weight: 700;
		color: #e9edef;
	}

	.MuiButton-root {
		background-color: #00a884;
		border: 2px solid #00a884;
		color: white;
		padding: 0 2rem;
		border-radius: 2.2rem;
		height: 4rem;
		max-width: 18rem;
		font-size: 1.4rem;
		text-transform: capitalize;

		:hover {
			background-color: unset;
			color: #e9edef;
			border: 2px solid #e9edef;
		}
	}

	@media only screen and (max-width: 767px) {
		border: 1px solid red;
		justify-content: center;
		align-items: center;
		height: 100%;
		margin-top: 5rem;
		max-height: 50rem;

		background: rgba(34, 46, 53, 0.35);
		backdrop-filter: blur(12.5px);
		-webkit-backdrop-filter: blur(12.5px);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.18);
	}
`
const Subheading = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	padding-bottom: 6rem;
	padding-top: 0.6rem;

	h2 {
		color: #e9edef;
		margin: 0;
		font-size: 1.4rem;
	}

	span {
		color: #e9edef;
		background-color: #00a884;
		border-radius: 2.2rem;
		padding: 0.3rem 1.2rem;
		font-weight: 700;
	}
`
const GithubButton = styled(IconButton)`
	position: absolute;
	bottom: 2rem;
	right: 3rem;
	width: 2.4rem;
	height: 2.4rem;
	padding: 2.4rem;

	svg {
		width: 3.2rem;
		height: 3.2rem;
		color: #e9edef;
	}

	@media only screen and (max-width: 767px) {
		display: none;
	}
`
