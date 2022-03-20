import styled from '@emotion/styled'

function TextInput({ value, onChange, placeholder, icon }) {
	return (
		<Container>
			{icon}
			<StyledInput type='text' placeholder={placeholder} value={value} onChange={onChange} />
		</Container>
	)
}

export default TextInput

const Container = styled.div`
	display: flex;
	align-items: center;
	gap: 2rem;
	border-radius: 0.8rem;
	padding: 1rem;
	background-color: #202c33;
	height: 3.4rem;

	& svg {
		width: 1.8rem;
		height: 1.8rem;
		color: #8696a0;
	}
`
const StyledInput = styled.input`
	outline: unset;
	border: unset;
	background-color: transparent;
	flex: 1;
	padding-left: 0.6rem;
	color: #e9edef;
	font-size: 1.4rem;

	::placeholder {
		color: #8696a0;
	}
`
