import styled from '@emotion/styled'
import { useState } from 'react'

import { Menu as MaterialMenu, MenuItem as MaterialMenuItem, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'next/router'

function OptionsMenu() {
	const [anchorEl, setAnchorEl] = useState(null)
	const router = useRouter()

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleLogout = () => {
		setAnchorEl(null)
		signOut(auth)
		router.push('/')
	}

	return (
		<Container>
			<IconButton onClick={handleClick}>
				<MoreVertIcon />
			</IconButton>

			<Menu
				id='long-menu'
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={!!anchorEl}
				onClose={() => setAnchorEl(null)}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</Container>
	)
}

export default OptionsMenu

const Container = styled.div``

const MenuItem = styled(MaterialMenuItem)`
	font-size: 1.4rem;
	font-weight: 500;
	border-radius: 0;
	color: #d1d7db;

	.MuiList-root {
		border-radius: 0rem;
	}
`

const Menu = styled(MaterialMenu)`
	margin-top: 1rem;

	.MuiMenu-list {
		background-color: #233138;
		width: 22.6rem;
		transition: background-color 0.2s ease-out;

		:hover {
			background-color: #111b21;
		}
	}

	.MuiPaper-root {
		border-radius: 0.4rem;
		padding: 1rem 0;
		background-color: #233138;
	}
`
