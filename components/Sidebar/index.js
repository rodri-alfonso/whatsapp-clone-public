import styled from '@emotion/styled'
import { IconButton } from '@mui/material'
import { Avatar } from '@mui/material'
import { useState } from 'react'

import ChatIcon from '@mui/icons-material/Chat'
import OptionsMenu from '../OptionsMenu'
import TextInput from '../TextInput'

import ChatCreator from 'components/ChatCreator'
import ChatsList from '../ChatsList'

import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import SearchIcon from '@mui/icons-material/Search'

function Sidebar() {
	const [user] = useAuthState(auth)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	return (
		<Container>
			<Header>
				<Avatar src={user?.photoURL} />
				<IconsContainer>
					<IconButton onClick={() => setIsDrawerOpen(true)}>
						<ChatIcon />
					</IconButton>
					<OptionsMenu />
				</IconsContainer>
			</Header>
			<ChatCreator open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
			<InputBox>
				<TextInput icon={<SearchIcon />} placeholder='Search a chat' />
			</InputBox>
			<ChatsList />
		</Container>
	)
}

export default Sidebar

const Container = styled.div`
	display: flex;
	flex-direction: column;
	border-right: 1px solid #374045;
	height: 100vh;
	min-width: 36rem;
	overflow-y: scroll;
	background-color: #111b21;

	@media (max-width: 768px) {
		width: 100%;
		border: unset;
	}

	::-webkit-scrollbar {
		display: none;
	}

	-ms-overflow-style: none; /* IE / Edge */
	scrollbar-width: none; /* Firefox */
`

const Header = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;
	background-color: #202c33;
	z-index: 1;
	padding: 1rem;
	height: 6rem;
`

const IconsContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 1.2rem;

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: #aebbc1;
	}
`
const InputBox = styled.div`
	padding: 1rem 1.4rem;
`
