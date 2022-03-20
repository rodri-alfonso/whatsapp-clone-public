import styled from '@emotion/styled'

function MainScreen() {
	return (
		<Container>
			<Image src='images/init-illustration.png' alt='' />
			<Information>
				<Title>
					<h1>WhatsApp Web</h1>
					<Chip>clone</Chip>
				</Title>

				<Text>
					This is not a real app. It is just a WhatsApp Web demo built only for a studies purposes. Uses email instead
					phone number.
				</Text>
			</Information>
		</Container>
	)
}

export default MainScreen

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 3.2rem;
	background-color: #222e35;
	flex: 1;
	height: 100%;
	padding: 2rem 4rem;
	border-bottom: 6px solid #328069;
`
const Chip = styled.span`
	background-color: #364147;
	color: #8696a0;
	height: 2.2rem;
	display: grid;
	place-items: center;
	font-size: 1rem;
	text-transform: uppercase;
	border-radius: 2rem;
	width: 6rem;
	font-weight: 700;
	margin-bottom: 0.4rem;
`
const Information = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	max-width: 58rem;

	border-bottom: 1px solid #8696a026;
	padding: 0 3.2rem;
	padding-bottom: 1.8rem;
`
const Text = styled.p`
	color: #8696a0;
	font-size: 1.4rem;
	text-align: center;
`

const Title = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	gap: 1.2rem;
	white-space: nowrap;

	h1 {
		margin: 0;
		font-size: 3.2rem;
		font-weight: 300;
		color: #e9edefe0;
	}
`
const Image = styled.img`
	width: 40rem;
	height: 24.4rem;
`
