import { CircularProgress } from '@mui/material'
import styled from '@emotion/styled'

function Loading() {
	return (
		<Container>
			<Spinner />
		</Container>
	)
}

export default Loading

const Container = styled.div`
	height: 100vh;
	display: grid;
	place-items: center;
	background-color: #111b21;
`

const Spinner = styled(CircularProgress)`
	color: #00a884;
`
